import Directory from "../../components/directory/directory.component";

import categories from '../../categories.json';

function Home() {
  return <Directory categories={categories} />;
}

export default Home;
