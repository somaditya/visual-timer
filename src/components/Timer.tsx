import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

function getData(start: any, due: any) {
  let today: number = Date.now();
  let remaining: number = Math.round((due - today) / 1000);
  let elapsed: number = Math.round((today - start) / 1000);

  return [
    ["Pac Man", "Percentage"],
    ["Remaining (sec)", remaining],
    ["Elapsed (sec)", elapsed],
  ];
}

function fmtDate(input: Date) {
  const date = new Date(input);
  const yyyy = date.getFullYear();
  const mon = date.getMonth() + 1;
  const day = date.getDate();

  const mm = mon < 10 ? "0" + mon : mon;
  const dd = day < 10 ? "0" + day : day;

  return yyyy + "-" + mm + "-" + dd;
}

const options = {
  legend: "none",
  pieSliceText: "value",
  pieStartAngle: 0,
  tooltip: { trigger: "mouse" },
  slices: {
    0: { color: "tomato" },
    1: { color: "lightgrey" },
  },
};

export function Timer() {
  let today: Date = new Date();
  const [start, setStart] = useState(today);

  let deadline: Date = new Date();
  deadline.setDate(today.getDate() + 10);
  const [due, setDue] = useState(deadline);

  const [data, setData] = useState(getData(start, due));

  useEffect(() => {
    const id = setInterval(() => {
      setData(getData(start, due));
    }, 1000);

    return () => {
      clearInterval(id);
    };
  });

  return (
    <div className="Timer">
      <table className="center">
        <thead>
          <tr>
            <th>
              <label htmlFor="start">Start Date</label>
            </th>
            <th>
              <label htmlFor="due">Due Date</label>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="date"
                name="start-date"
                id="start"
                value={fmtDate(start)}
                onChange={(e) => setStart(new Date(e.target.value))}
              />
            </td>
            <td>
              <input
                type="date"
                name="due-date"
                id="due"
                value={fmtDate(due)}
                onChange={(e) => setDue(new Date(e.target.value))}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"600px"}
      />
    </div>
  );
}
