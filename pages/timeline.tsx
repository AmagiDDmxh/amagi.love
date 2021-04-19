import React from "react";
import moment from "moment";
import { Heading } from "@dracula/dracula-ui";

interface ITimeline {
  date: string | Date;
  descriptions: string | string[];
}
const renderTimelines = (timelines: ITimeline[]) =>
  timelines.map(({ date, descriptions }) => {
    const dateString = moment(date).format("YYYY-MM-DD");

    return (
      <li>
        <span>{dateString}</span>
        {Array.isArray(descriptions) ? (
          descriptions.map((t) => <p>{t}</p>)
        ) : (
          <p>{descriptions}</p>
        )}
      </li>
    );
  });

// const toUi = timelines => ({})

const data = [
  { date: new Date("2020 05 20"), descriptions: "到达上海" },
  {
    date: new Date("2020 05 25"),
    descriptions:
      "Boss说我没经过社会毒打，然后被其炒鱿鱼，第二次收到我心高气傲这个评价，或许我该注意一下了",
  },
  {
    date: new Date("2020-06-01"),
    descriptions:
      "准备搬走被舍友煮的饭感动，准备留在上海找工作。开始了 Topcoder",
  },
  {
    date: new Date("2020-06-08"),
    descriptions: [
      "Topcoder 两个项目都失败了。由于没有把时间放社区上，社区工作也停止了。",
      "沦落",
      "但是呢，不气馁，爬起来再战，做好计划准备面试力扣和图书管理员",
      // '想起了白白，30岁却又像个小女孩。与舍友产生矛盾小心翼翼，要搬家了总会忧虑重重。喜欢安稳的生活的一个女生'
    ],
  },
  {
    date: new Date("2020 08 7"),
    descriptions:
      "隔了三天才看到来自 LeetCode 的拒信，经验不匹配，说明我的技术水平有点菜呀。。",
  },
  {
    date: new Date("2020 08 11"),
    descriptions: "到底还是找到并开始工作了，加油吧",
  },
  { date: new Date("2020 09 01"), descriptions: "npm registry 真是让人头疼" },
  // { date: new Date('2020 08 26'), descriptions: '开始研究交易机器人' },
  // { date: new Date('2020 08 12'), descriptions: '被迫加入驰链，开始开发 Planet-Slash' },
].reverse();

export default function Timeline() {
  return (
    <>
      <Heading color="black">Notes</Heading>
      <ul>
        <li>
          2020-11-01 积蓄耗光没折，
          <span className="blink" style={{ fontSize: 20 }}>
            |
          </span>
        </li>
        <li>
          2020-10-01 <p>回老家尝试靠 TopCoder 和自己做产品赚钱</p>
        </li>
        {renderTimelines(data)}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </ul>
    </>
  );
}
