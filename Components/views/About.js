/* eslint-disable no-unused-vars */
import html from "html-literal";

// eslint-disable-next-line prettier/prettier
export default state => html`
  <div id="pageContents"></div>
  <div id="about">
  <h5>In the future we plan on creating a system that will
      allow Artists and Producers to connect with each other directly on our app.
      This will help Artists learn more about mixing and mastering as they will
      be creating a song together in real time!

        If you have any questions or comments we hope you reach out to us so we
      can assist you as best as we can! And remember, consistency is the key.
    </h5>
    <h2 class="mission">OUR MISSION</h2>
    <p class="goal">
      Our goal is to help out newer upcoming artists, or people that are curious
      about making music, mix and master their own songs. We know that
      professional studio time can be really expensive, so let's cut the costs
      by learning how to do it ourselves. You can record anywhere! In your
      bedroom, living room, or even your car!
    </p>
    <div id="error">
    <form action="https://formspree.io/f/xzbwaayo" method="POST">
      <div>
        <h3>ENTER YOUR NAME</h3>
        <h3>AND EMAIL SO WE CAN REACH OUT!</h3>
        <label class="names" for="name">NAME</label>
        <input id="name" name="name" type="text" required />
      </div>
      <div>
      <label class="mail" for="email">EMAIL</label>
      <input id="email" name="email" type="email" required />
      </div>
      <label class="question" for="question">Question/Comment</label>
    <input id="question" name="question" type="question" required />
      <button class="sub" type="submit">Submit</button>
    </form>
    <img
      class="homepage"
      src="https://cdn.mos.cms.futurecdn.net/doXGMAjXPZaCpe9tjkFKsd.jpg"
      alt="studio"
    />
  </section>
`;
