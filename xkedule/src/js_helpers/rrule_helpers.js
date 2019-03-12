import { RRule } from "rrule";


const rrule_day_dict = [RRule.MO,
                        RRule.TU,
                        RRule.WE,
                        RRule.TH,
                        RRule.FR,
                        RRule.SA,
                        RRule.SU]

const everyday_rrule = new RRule({
  freq: RRule.DAILY,
  interval: 1,
})

const everyweekday_rrule = new RRule({
  freq: RRule.WEEKLY,
  interval: 1,
  byweekday: [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR]
})

function weekly_on_weekday(weekday){ // weekday number, where monday = 0 and sunday = 6;
    const weekly_rrule = new RRule({
                              freq: RRule.WEEKLY,
                              interval: 1,
                              byweekday: rrule_day_dict[weekday]
                          });
    return weekly_rrule;
}

function monthly_on_monthday(monthday){ // monthday -> number of the day
    const monthly_rrule = new RRule({
                              freq: RRule.MONTHLY,
                              interval: 1,
                              bymonthday: [monthday]
                          });
    return monthly_rrule;
}

function yearly_on_month_day(month, day){ // month -> month's number, day -> number of the day
    const yearly_rrule = 	new RRule({
                                  freq: RRule.YEARLY,
                                  interval: 1,
                                  bymonth: [month],
                                  bymonthday: [day]
                                })
    return yearly_rrule;
}
