import { Button } from "@chakra-ui/react";
import { DeleteIcon, StarIcon } from "@chakra-ui/icons";

import useSave from "../hooks/useSave";
import { Item } from "../types";

interface FavoriteButtonProps {
  isSaved: boolean;
  item: Item
}

const FavoriteButton = ({ isSaved, item}: FavoriteButtonProps) => {
  const { removeItem, saveItem } = useSave()

  return (
    isSaved
      ? <Button onClick={() => removeItem(item)} flex='1' variant='ghost' leftIcon={<DeleteIcon />}>
          Remove from Favorites
        </Button>
      : <Button onClick={() => saveItem(item)} flex='1' variant='ghost' leftIcon={<StarIcon />}>
          Add to Favorites
        </Button>
  )
}

export default FavoriteButton
