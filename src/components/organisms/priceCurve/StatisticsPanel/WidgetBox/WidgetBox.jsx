import useScript from "../../../../../helpers/hooks/useScript";

const WidgetBox = () => {
  useScript("https://widget.nomics.com/embed.js");
  return (
      
    <div className="widget">
      <div
        className="nomics-ticker-widget"
        data-name="Ndau"
        data-base="XND"
        data-quote="USD"
      />
    </div>
  );
};

export default WidgetBox;
