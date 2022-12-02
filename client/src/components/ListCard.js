import PublishedListCard from "./PublishedListCard";
import UnpublishedListcard from "./UnpublishedListcard";

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { idNamePair, resetSongIndex } = props;
   
    let isPublished = idNamePair.isPublished;
    if (isPublished)
    return <PublishedListCard idNamePair={idNamePair} resetSongIndex={resetSongIndex}/>
    else return <UnpublishedListcard idNamePair={idNamePair} resetSongIndex={resetSongIndex}/>
}

export default ListCard;
