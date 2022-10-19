import html from "html-literal";

// eslint-disable-next-line prettier/prettier
export default state => html`
  <section id="about">
    <h2>About Us/Our Mission</h2>
    <div id="error"></div>
    <form action="/" method="GET">
      <div>
        <label for="name">Name</label>
        <input id="name" name="name" type="text" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
      <button type="submit">Submit</button>
    </form>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu sagittis
      nulla. Etiam semper mauris a quam tempus, non feugiat massa posuere. Morbi
      vitae nisi aliquam, semper diam id, molestie leo. In hac habitasse platea
      dictumst. Nulla et enim vel elit dictum viverra. Nunc pharetra lacinia
      arcu sit amet dignissim. Pellentesque ut mi nulla.
    </p>
    <img
      src="https://cdn.mos.cms.futurecdn.net/doXGMAjXPZaCpe9tjkFKsd.jpg"
      alt="studio"
    />
  </section>
`;
