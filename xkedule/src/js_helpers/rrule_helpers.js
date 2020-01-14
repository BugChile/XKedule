import { RRule } from "rrule";
import { daysCapital } from "./constants";

const rrule_day_dict = [
  RRule.SU,
  RRule.MO,
  RRule.TU,
  RRule.WE,
  RRule.TH,
  RRule.FR,
  RRule.SA
];

const everyday_rrule = new RRule({
  freq: RRule.DAILY,
  interval: 1
});

const everyweekday_rrule = new RRule({
  freq: RRule.WEEKLY,
  interval: 1,
  byweekday: [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR]
});

function weekly_on_weekday(weekday) {
  // weekday number, where sunday = 0 and saturday = 6;
  const weekly_rrule = new RRule({
    freq: RRule.WEEKLY,
    interval: 1,
    byweekday: rrule_day_dict[weekday]
  });
  return weekly_rrule;
}

function monthly_on_monthday(monthday) {
  // monthday -> number of the day
  const monthly_rrule = new RRule({
    freq: RRule.MONTHLY,
    interval: 1,
    bymonthday: [monthday]
  });
  return monthly_rrule;
}

function yearly_on_month_day(month, day) {
  // month -> month's number, day -> number of the day
  const yearly_rrule = new RRule({
    freq: RRule.YEARLY,
    interval: 1,
    bymonth: [month],
    bymonthday: [day]
  });
  return yearly_rrule;
}

function get_day_occurrence(date) {
  const day = date.getDate();
  const occurrence = Math.floor((day - 1) / 7) + 1;
  return occurrence;
}

function day_ordinal(date) {
  // return which occurence of a given day: 1st Wednesday, 3rd Friday, etc.
  const ordinal = ["1st", "2nd", "3rd"];
  const occurrence = get_day_occurrence(date);
  var occurrence_ordinal = `${occurrence}th`;
  if (occurrence < 2) {
    occurrence_ordinal = ordinal[occurrence - 1];
  }
  return `${occurrence_ordinal} ${daysCapital[date.getDay()]}`;
}

function getRepeatsSummary(value) {
  if (typeof value === "string") {
    return value;
  } else {
    return value.toText();
  }
}

function getRepeatsString(value) {
  if (typeof value === "string") {
    return value;
  } else {
    return value.toString();
  }
}

export {
  rrule_day_dict,
  everyday_rrule,
  everyweekday_rrule,
  weekly_on_weekday,
  monthly_on_monthday,
  yearly_on_month_day,
  get_day_occurrence,
  day_ordinal,
  getRepeatsSummary,
  getRepeatsString
};
