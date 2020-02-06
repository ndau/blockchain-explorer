/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import moment from 'moment';

// Returns the price of the next ndau given the number already sold
export const price_at_unit = (nunits_sold) => {
  const phase_blocks = 10000;
  const sale_block = Math.floor(nunits_sold / 1000);

  if (sale_block <= phase_blocks * 1) {
    // price in phase 1 has 14 doublings, from a starting point of $1 to a finishing price
    // of $16384 at the ten-thousandth block (the one that starts at 999,900)
    var price1 = Math.pow(2.0, sale_block * 14 / 9999);
    return price1;
  }

  // NOTE: this function replaces the elaborate spreadsheet model for phase 2 with a cubic approximation
  // function that was developed // from a curve fit of a few of the key points on the phase 2 and
  // phase 3 data. It is off by a little bit from the initially proposed curve but it's vastly easier to calculate.
  // The difference is a little bit high early in phase 2 (at worst, 13% high) and drifts to about
  // 5% low late in phase 2. It's generally slightly high in phase 3, peaking at 8%, but that's probably
  // a good thing as it makes the curve more s-like.
  // Note that phase 1 is exactly as originally proposed and the slope at entry of phase 2 is deliberately smooth.
  if (sale_block < phase_blocks * 3) {
    // determined by a cubic curvefit for phase 2 and 3
    // y = -41633 - 8.286618*x + 0.00167424*x^2 - 2.654015e-8*x^3
    const d = -2.654015e-8;
    const c = 0.00167424;
    const b = -8.286618;
    const a = -41633;
    var x = sale_block;

    var price2 = d * Math.pow(x, 3) + c * Math.pow(x, 2) + b * x + a;
    return price2;
  }

  // after the end of phase 3 we don't sell any more ndau so just return the final price
  return 500450.83;
};

// this does a binary search for the lowest multiple of 1000 units that exceeds the price
export const unit_at_price = (price) => {
  let high = 30000;
  let low = 0;
  let guess = 15000;
  while (high - low > 1) {
    let p = price_at_unit(guess * 1000);
    if (p >= price) {
      high = guess;
    }
    if (p < price) {
      low = guess;
    }
    guess = Math.floor((high + low) / 2);
    // console.log('H:', high, 'L:', low, 'G:', guess, 'p:', p, 'wanted: ', price);
  }
  return guess * 1000;
};

// returns the total price for a group of ndau given the amount to be purchased and the number already sold
export const total_price_for = (num_ndau, already_sold) => {
  const num_per_block = 1000;
  var total_price = 0;
  for (;;) {
    var price = price_at_unit(already_sold);
    var available_in_this_block = already_sold % num_per_block;
    if (available_in_this_block === 0) {
      available_in_this_block = num_per_block;
    }

    // if what we're buying fits in the current block, just calculate the total price and we're done
    if (num_ndau <= available_in_this_block) {
      total_price += price * num_ndau;
      return total_price;
    }

    // otherwise, buy the remainder of this block and loop
    num_ndau -= available_in_this_block;
    already_sold += available_in_this_block;
    total_price += price * available_in_this_block;
  }
};

export const unlocked_rates = [
  { starting_days: 30, annual_pctg_rate: 2 },
  { starting_days: 60, annual_pctg_rate: 3 },
  { starting_days: 90, annual_pctg_rate: 4 },
  { starting_days: 120, annual_pctg_rate: 5 },
  { starting_days: 150, annual_pctg_rate: 6 },
  { starting_days: 180, annual_pctg_rate: 7 },
  { starting_days: 210, annual_pctg_rate: 8 },
  { starting_days: 240, annual_pctg_rate: 9 },
  { starting_days: 270, annual_pctg_rate: 10 }
];

export const lock_bonus = [
  { starting_days: 90, annual_pctg_rate: 1 },
  { starting_days: 180, annual_pctg_rate: 2 },
  { starting_days: 365, annual_pctg_rate: 3 },
  { starting_days: 730, annual_pctg_rate: 4 },
  { starting_days: 1095, annual_pctg_rate: 5 }
];

export const lookup_value = (table, days) => {
  let rate = 0;
  for (const row of table) {
    if (days >= row.starting_days) {
      rate = row.annual_pctg_rate;
    }
  }
  return rate;
};

export const lookup_eai_rate = (num_days_for_lock, num_days_since_purchase) => {
  let base_rate = lookup_value(unlocked_rates, num_days_for_lock);
  let default_rate = lookup_value(unlocked_rates, num_days_since_purchase);
  if (base_rate > default_rate) {
    default_rate = base_rate;
  }
  let bonus_rate = lookup_value(lock_bonus, num_days_for_lock);
  return default_rate + bonus_rate;
};

// NOTE -- this code is WRONG -- it works only if days since purchase is less
// than the lock time (and thus the rate chart is flat).
// It needs to be completely rewritten but is OK for the short term since
// this condition is true at least through genesis (all initial users are locked).
export const get_eai = (num_ndau, num_days_for_lock, num_days_since_purchase) => {
  // rate is in percentage points
  let rate = lookup_eai_rate(num_days_for_lock, num_days_since_purchase);
  // convert it to a continuous annual interest factor
  let effective_annual_rate = Math.exp(rate / 100.0) - 1;
  // now calculate the multiplier based on the number of days
  let f = effective_annual_rate * num_days_since_purchase / 365;
  let eai = num_ndau * f;
  return eai;
};

export const get_current_price = (ndauSold) => {
  return price_at_unit(ndauSold);
};

export const get_market_cap = (ndauSold) => {
  return get_current_price(ndauSold - 1) * ndauSold;
};

export const get_my_current_price = (myNdau, currentPrice) => {
  return myNdau * currentPrice;
};

export const get_market_cap_with_current_price = (ndauSold, currentPrice) => {
  return currentPrice * ndauSold;
};

export const getNumberOfDaysForLock = (wallet) => {
  let start = moment(wallet.received);
  let end = moment(wallet.lockedUntil);
  let days = end.diff(start, 'days');
  return days;
};

export const getNumberOfDaysSincePurchased = (wallet) => {
  let start = moment(wallet.received);
  let end = moment();
  let days = end.diff(start, 'days');
  return days;
};

export default {
  price_at_unit,
  unit_at_price,
  total_price_for,
  get_current_price,
  get_market_cap,
  lookup_eai_rate,
  get_eai,
  getNumberOfDaysForLock,
  getNumberOfDaysSincePurchased,
  get_market_cap_with_current_price,
  get_my_current_price
};
