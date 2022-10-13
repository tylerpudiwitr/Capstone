import html from "html-literal";

export default st => html`
  <table id="tunes">
    <tr>
      <th>Genre</th>
      <th>Artist</th>
    </tr>
    ${st.tunes
      .map(tune => {
        return `<tr><td>${tune.genre}</td><td>${tune.artist}</td><td>`;
      })
      .join("")}
  </table>
`;
