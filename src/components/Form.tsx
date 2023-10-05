function fmtDate(input: Date) {
  const date = new Date(input);
  const yyyy = date.getFullYear();
  const mon = date.getMonth() + 1;
  const day = date.getDate();

  const mm = mon < 10 ? "0" + mon : mon;
  const dd = day < 10 ? "0" + day : day;

  return yyyy + "-" + mm + "-" + dd;
}

export function Form(start: any, due: any, onChange: any) {
  return (
    <table className="center">
      <thead>
        <tr>
          <th>
            <label htmlFor="start">Start Date</label>
          </th>
          <th>(mm/dd/yyyy)</th>
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
              onChange={onChange}
            />
          </td>
          <td></td>
          <td>
            <input
              type="date"
              name="due-date"
              id="due"
              value={fmtDate(due)}
              onChange={onChange}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
