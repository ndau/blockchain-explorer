import React, { Component } from 'react';
import * as d3 from 'd3';
import ReactFauxDom from 'react-faux-dom';
import { Text } from 'grommet';
import ndau from './ndauMath.js';
import './style.css';

class PriceCurve extends Component {
  // genData generates a data table we can use to calculate extents
  // It uses the ndau price function
  genData(start_ndau, end_ndau) {
    var points = [];
    for (var n = start_ndau; n <= end_ndau; n += Math.floor((end_ndau - start_ndau) / 1000)) {
      points.push({
        x: n,
        y: ndau.price_at_unit(n)
      });
    }
    return points;
  }

  // drawChart actually does the drawing; it's static so doesn't need animation
  // it accepts parameters to set the beginning and end of the x axis
  drawChart(start_ndau, end_ndau, useLogYAxis, beginHighlight, endHighlight) {
    // we need a faux dom because otherwise d3 and React argue over it
    // const faux = this.props.connectFauxDOM('div', 'chart');
    const faux = new ReactFauxDom.Element('div');

    // set some margins so we have room for labels
    var margin = { top: 10, right: 10, bottom: 30, left: 30 };

    // create our parent container object and set its size
    var parent = d3
      .select(faux)
      .append('svg')
      .attr('height', '300')
      .attr('width', '600')
      .attr('preserveAspectRatio', 'xMidYMin meet')
      .attr('viewBox', '0 0 800 100')
      .attr('class', 'parent')
      .attr('style', 'padding-bottom: 10px;');

    var width = +parent.attr('width');
    var height = +parent.attr('height');
    // Now set up our svg to fit within it
    var svg = parent
      .append('g')
      .attr('class', 'graph')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // get the data table
    let data = [];
    if (end_ndau > 0) {
      data = this.genData(start_ndau, end_ndau);
    }

    let xdomain = d3.extent(data, function(d) {
      return d.x;
    });

    let ydomain = d3.extent(data, function(d) {
      return d.y;
    });
    ydomain[0] = 0;
    // these are scaling functions for the graph
    var x = d3.scaleLinear().domain(xdomain).range([ 0, width ]);
    var y = d3.scaleLinear().domain(ydomain).range([ height, 0 ]);
    if (useLogYAxis) {
      ydomain[0] = 1;
      y = d3.scaleLog().domain(ydomain).range([ height, 0 ]);
    }

    // this is the line we are drawing
    var line = d3
      .line()
      .x(function(d) {
        return x(d.x);
      })
      .y(function(d) {
        return y(d.y);
      });

    // these are the axes; we specify 5 ticks because our numbers can be large and need room
    var xaxis = d3.axisBottom(x).ticks(5);

    var yaxis = d3.axisLeft(y).ticks(5).tickFormat(d3.format('.2f'));

    // draw the X axis
    svg
      .append('g')
      .attr('transform', 'translate(' + margin.left + ', ' + height + ')')
      .attr('class', 'axis')
      .call(xaxis)
      .select('.domain');

    // and the Y axis
    svg
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',0)')
      .attr('class', 'axis')
      .call(yaxis);

    //Container for the glow filter
    var defs = svg.append('defs');
    //Filter for the outside glow
    var filter = defs.append('filter').attr('id', 'glow');
    filter.append('feGaussianBlur').attr('stdDeviation', '5.5').attr('result', 'coloredBlur');
    var feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // the label for the Y axis
    svg
      .append('text')
      .attr('class', 'axislabel')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0)
      .attr('x', -height / 2)
      .attr('dy', '-.9em') // offsets the label so it isn't on top of the axis
      .text(<Text id="graph.yAxisTitle" />);

    // the label for the X axis
    svg
      .append('text')
      .attr('class', 'axislabel')
      .attr('dy', '2em')
      .attr('x', width / 1.5)
      .attr('y', height)
      .text(<Text id="graph.xAxisTitle" />);

    // now draw the hairlines
    // We draw them at each doubling point
    // for (let e = 1; e < 19; e++) {
    //   let p = Math.pow(2, e);
    //   let n = ndau.unit_at_price(p);

    //   svg
    //     .append('line')
    //     .attr('class', 'vhairline')
    //     .attr('transform', 'translate(' + margin.left + ',0)')
    //     .attr('x1', x(n))
    //     .attr('y1', y(ydomain[0]))
    //     .attr('x2', x(n))
    //     .attr('y2', y(p));

    //   svg
    //     .append('line')
    //     .attr('class', 'hhairline')
    //     .attr('transform', 'translate(' + margin.left + ',0)')
    //     .attr('x1', x(xdomain[0]))
    //     .attr('y1', y(p))
    //     .attr('x2', x(n))
    //     .attr('y2', y(p));
    // }

    // and the line itself
    svg
      .append('path')
      .attr('transform', 'translate(' + margin.left + ',0)')
      .datum(data)
      .attr('class', 'ndaucurve')
      .attr('d', line)
      .style('filter', 'url(#glow)');

    // and if we have one, the box highlight
    if (beginHighlight !== endHighlight) {
      let w = x(endHighlight) - x(beginHighlight);
      let y1 = data[data.length - 1].y;
      let h = y(y1) - y(0);
      svg
        .append('rect')
        .attr('transform', 'translate(' + margin.left + ',0)')
        .attr('x', x(beginHighlight))
        .attr('y', y(y1))
        .attr('width', w)
        .attr('height', -h)
        .attr('class', 'highlight');
    }

    // now we have set up our special DOM, now draw it
    return faux.toReact();
  }

  render() {
    if (this.props.ndauSold < 1000) {
      return null;
    }
  
    return (
      <div>
        {this.drawChart(
          0,
          this.props.ndauSold,
          false,
          this.props.highlightStart,
          this.props.highlightEnd
        )}
      </div>
    );
  }
}

PriceCurve.defaultProps = {
  ndauSold: 1000000,
  highlightStart: 0,
  highlightEnd: 0,
  chart: 'Loading graph...'
};

export default PriceCurve;