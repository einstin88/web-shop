import DirectoryItem from "../directory-item/directory-item.component";

import { DirectoriesContainer } from './directory.styles';

function Directory ({ categories }) {
    return (
      <DirectoriesContainer>
        {categories.map((category) => (
          <DirectoryItem key={category.id} category={category} />
        ))}
      </DirectoriesContainer>
    );
}

export default Directory;