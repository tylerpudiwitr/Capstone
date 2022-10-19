import html from "html-literal";

// eslint-disable-next-line prettier/prettier
export default state => html`
  <section id="about">
    <h2>About Us/Our Mission</h2>
    <p>
      Our goal is to help out newer upcoming artists, or people that are curious
      about making music, mix and master their own songs. We know that
      professional studio time can be really expensive, so let's cut the costs
      by learning how to do it ourselves. You can record anywhere! In your
      bedroom, living room, or even your car!
    </p>
    <div id="error"></div>
    <form action="/" method="GET">
      <div>
        <label for="name">Name</label>
        <input id="name" name="name" type="text" required />
      </div>
      <div>
        <label for="email">E-mail</label>
        <input id="email" name="email" type="email" />
      </div>
      <button type="submit">Submit</button>
    </form>
    <img
      src="https://cdn.mos.cms.futurecdn.net/doXGMAjXPZaCpe9tjkFKsd.jpg"
      alt="studio"
    />
  </section>
`;
