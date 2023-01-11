import HomeIcon from "@valence-icons/ui/Home4Fill";

import { Button } from "@react-valence/button";

export const HomeButton = (props) => {
  return (
    <div style={{position: 'absolute'}}>
      <Button variant={'overBackground'}>
        <HomeIcon />
      </Button>
    </div>
  );
};
