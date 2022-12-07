import { createContext, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import jsTPS from "../common/jsTPS";
import api from "./store-request-api";
import CreateSong_Transaction from "../transactions/CreateSong_Transaction";
import MoveSong_Transaction from "../transactions/MoveSong_Transaction";
import RemoveSong_Transaction from "../transactions/RemoveSong_Transaction";
import UpdateSong_Transaction from "../transactions/UpdateSong_Transaction";
import AuthContext from "../auth";
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});
// console.log("create GlobalStoreContext");

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
  CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
  CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
  CREATE_NEW_LIST: "CREATE_NEW_LIST",
  LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
  LOAD_PUBLISH_LIST_PAIRS: "LOAD_PUBLISH_LIST_PAIRS",
  GET_PUBLISHED_PLAYLIST_PAIRS: "GET_PUBLISHED_PLAYLIST_PAIRS",
  MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
  SET_CURRENT_LIST: "SET_CURRENT_LIST",
  SET_LIST_TO_PLAY: "SET_LIST_TO_PLAY",
  SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
  EDIT_SONG: "EDIT_SONG",
  REMOVE_SONG: "REMOVE_SONG",
  HIDE_MODALS: "HIDE_MODALS",
  UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
  SET_SCREEN: "SET_SCREEN",
  SET_SEARCH_TEXT: "SET_SEARCH_TEXT",
};

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

const CurrentModal = {
  NONE: "NONE",
  DELETE_LIST: "DELETE_LIST",
  EDIT_SONG: "EDIT_SONG",
  REMOVE_SONG: "REMOVE_SONG",
};

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
  // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
  const [store, setStore] = useState({
    searchText: "",
    currentScreen: "home",
    listBeingPlay: null,
    currentModal: CurrentModal.NONE,
    idNamePairs: [],
    publishedListPairs: [],
    currentList: null,
    currentSongIndex: -1,
    currentSong: null,
    newListCounter: 0,
    listNameActive: false,
    listIdMarkedForDeletion: null,
    listMarkedForDeletion: null,
  });
  const history = useHistory();

  // console.log("inside useGlobalStore");

  // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
  const { auth } = useContext(AuthContext);
  // console.log("auth: " + auth);

  // HERE'S THE DATA STORE'S REDUCER, IT MUST
  // HANDLE EVERY TYPE OF STATE CHANGE
  const storeReducer = action => {
    const { type, payload } = action;
    switch (type) {
      case GlobalStoreActionType.SET_SEARCH_TEXT: {
        return setStore({
          searchText: payload,
          currentScreen: store.currentScreen,
          listBeingPlay: store.listBeingPlay,
          currentModal: CurrentModal.NONE,
          idNamePairs: store.idNamePairs,
          publishedListPairs: store.publishedListPairs,
          currentList: null,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: 0,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
        })
      }
      case GlobalStoreActionType.SET_SCREEN: {
        return setStore({
          searchText: store.searchText,
          currentScreen: payload,
          listBeingPlay: store.listBeingPlay,
          currentModal: CurrentModal.NONE,
          idNamePairs: store.idNamePairs,
          publishedListPairs: store.publishedListPairs,
          currentList: null,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: 0,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
        });
      }
      // LIST UPDATE OF ITS NAME
      case GlobalStoreActionType.CHANGE_LIST_NAME: {
        return setStore({
          searchText: store.searchText,
          currentScreen: store.currentScreen,
          listBeingPlay: store.listBeingPlay,
          currentModal: CurrentModal.NONE,
          idNamePairs: payload.idNamePairs,
          publishedListPairs: store.publishedListPairs,
          currentList: null,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
        });
      }
      // STOP EDITING THE CURRENT LIST
      case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
        return setStore({
          searchText: store.searchText,
          currentScreen: store.currentScreen,
          listBeingPlay: store.listBeingPlay,
          currentModal: CurrentModal.NONE,
          idNamePairs: store.idNamePairs,
          publishedListPairs: store.publishedListPairs,
          currentList: null,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
        });
      }
      // CREATE A NEW LIST
      case GlobalStoreActionType.CREATE_NEW_LIST: {
        return setStore({
          searchText: store.searchText,
          currentScreen: store.currentScreen,
          listBeingPlay: store.listBeingPlay,
          currentModal: CurrentModal.NONE,
          idNamePairs: payload.idNamePairs,
          publishedListPairs: store.publishedListPairs,
          currentList: payload.playlist,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter + 1,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
        });
      }
      // GET ALL THE LISTS SO WE CAN PRESENT THEM
      case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
        return setStore({
          searchText: store.searchText,
          currentScreen: store.currentScreen,
          listBeingPlay: store.listBeingPlay,
          currentModal: CurrentModal.NONE,
          idNamePairs: payload,
          publishedListPairs: store.publishedListPairs,
          currentList: null,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
        });
      }
      case GlobalStoreActionType.LOAD_PUBLISH_LIST_PAIRS: {
        return setStore({
          searchText: store.searchText,
          currentScreen: store.currentScreen,
          listBeingPlay: null,
          currentModal: CurrentModal.NONE,
          idNamePairs: store.idNamePairs,
          publishedListPairs: payload,
          currentList: null,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
        });
      }
      case GlobalStoreActionType.GET_PUBLISHED_PLAYLIST_PAIRS: {
        return setStore({
          searchText: store.searchText,
          currentScreen: store.currentScreen,
          listBeingPlay: store.listBeingPlay,
          currentModal: CurrentModal.NONE,
          idNamePairs: [],
          publishedListPairs: payload,
          currentList: null,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
        });
      }
      // PREPARE TO DELETE A LIST
      case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
        return setStore({
          searchText: store.searchText,
          currentScreen: store.currentScreen,
          listBeingPlay: store.listBeingPlay,
          currentModal: CurrentModal.DELETE_LIST,
          idNamePairs: store.idNamePairs,
          publishedListPairs: store.publishedListPairs,
          currentList: null,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: payload.id,
          listMarkedForDeletion: payload.playlist,
        });
      }
      // UPDATE A LIST
      case GlobalStoreActionType.SET_CURRENT_LIST: {
        return setStore({
          searchText: store.searchText,
          currentScreen: store.currentScreen,
          listBeingPlay: store.listBeingPlay,
          currentModal: CurrentModal.NONE,
          idNamePairs: store.idNamePairs,
          publishedListPairs: store.publishedListPairs,
          currentList: payload,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
        });
      }
      case GlobalStoreActionType.SET_LIST_TO_PLAY: {
        return setStore({
          searchText: store.searchText,
          currentScreen: store.currentScreen,
          listBeingPlay: payload,
          currentModal: CurrentModal.NONE,
          idNamePairs: store.idNamePairs,
          publishedListPairs: store.publishedListPairs,
          currentList: store.currentList,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
        });
      }
      // START EDITING A LIST NAME
      case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
        return setStore({
          searchText: store.searchText,
          currentScreen: store.currentScreen,
          listBeingPlay: store.listBeingPlay,
          currentModal: CurrentModal.NONE,
          idNamePairs: store.idNamePairs,
          publishedListPairs: store.publishedListPairs,
          currentList: payload,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: true,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
        });
      }
      //
      case GlobalStoreActionType.EDIT_SONG: {
        return setStore({
          searchText: store.searchText,
          currentScreen: store.currentScreen,
          listBeingPlay: store.listBeingPlay,
          currentModal: CurrentModal.EDIT_SONG,
          idNamePairs: store.idNamePairs,
          publishedListPairs: store.publishedListPairs,
          currentList: store.currentList,
          currentSongIndex: payload.currentSongIndex,
          currentSong: payload.currentSong,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
        });
      }
      case GlobalStoreActionType.REMOVE_SONG: {
        return setStore({
          searchText: store.searchText,
          currentScreen: store.currentScreen,
          listBeingPlay: store.listBeingPlay,
          currentModal: CurrentModal.REMOVE_SONG,
          idNamePairs: store.idNamePairs,
          publishedListPairs: store.publishedListPairs,
          currentList: store.currentList,
          currentSongIndex: payload.currentSongIndex,
          currentSong: payload.currentSong,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
        });
      }
      case GlobalStoreActionType.HIDE_MODALS: {
        return setStore({
          searchText: store.searchText,
          currentScreen: store.currentScreen,
          listBeingPlay: store.listBeingPlay,
          currentModal: CurrentModal.NONE,
          idNamePairs: store.idNamePairs,
          publishedListPairs: store.publishedListPairs,
          currentList: store.currentList,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
        });
      }
      case GlobalStoreActionType.UNMARK_LIST_FOR_DELETION: {
        return setStore({
          searchText: store.searchText,
          currentScreen: store.currentScreen,
          listBeingPlay: store.listBeingPlay,
          currentModal: CurrentModal.NONE,
          idNamePairs: store.idNamePairs,
          publishedListPairs: store.publishedListPairs,
          currentList: store.currentList,
          currentSongIndex: -1,
          currentSong: null,
          newListCounter: store.newListCounter,
          listNameActive: false,
          listIdMarkedForDeletion: null,
          listMarkedForDeletion: null,
        });
      }
      default:
        return store;
    }
  };

  // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
  // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN
  // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

  store.sortBy = function(content) {
    async function asyncSortBy() {
      if (store.currentScreen === "home") {
        let response = await api.getPlaylistPairs();
        if (response.data.success) {
          let pairsArray = response.data.idNamePairs;
          if (content === "likes") {
            pairsArray.sort((a, b) => (b.likes - a.likes))
            storeReducer({
              type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
              payload: pairsArray,
            })
          }
          if (content === "dislikes") {
            pairsArray.sort((a, b) => (b.dislikes - a.dislikes));
            storeReducer({
              type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
              payload: pairsArray,
            })
          }
          if (content === "name") {
            pairsArray.sort((a, b) => (b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 1);
            storeReducer({
              type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
              payload: pairsArray,
            })
          }
        }
      }
      else if (store.currentScreen === "allList" || store.currentScreen === "user") {
        let response = await api.getPublishedPlaylistPairs();
        if (response.data.success) {
          let pairsArray = response.data.pairs;
          if (content === "likes") {
            pairsArray.sort((a, b) => (b.likes - a.likes))
            storeReducer({
              type: GlobalStoreActionType.LOAD_PUBLISH_LIST_PAIRS,
              payload: pairsArray,
            })
          }
          if (content === "dislikes") {
            pairsArray.sort((a, b) => (b.dislikes - a.dislikes));
            storeReducer({
              type: GlobalStoreActionType.LOAD_PUBLISH_LIST_PAIRS,
              payload: pairsArray,
            })
          }
          if (content === "name") {
            pairsArray.sort((a, b) => (b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 1);
            storeReducer({
              type: GlobalStoreActionType.LOAD_PUBLISH_LIST_PAIRS,
              payload: pairsArray,
            })
          }
        }
      }
    }
    asyncSortBy();
  }

  store.setSearchText = function(text) {
    storeReducer({
      type: GlobalStoreActionType.SET_SEARCH_TEXT,
      payload: text,
    })
  }

  store.setScreen = function (screen) {
    storeReducer({
      type: GlobalStoreActionType.SET_SCREEN,
      payload: screen,
    });
  }

  store.publishPlaylist = function () {
    let list = store.currentList;
    list.isPublished = true;
    let now = new Date();
    list.publishedDate = now.toDateString();
    console.log(list);

    async function asyncPublishPlaylist() {
      let response = await api.updatePlaylistById(list._id, list);
      if (response.data.success) {
        async function getListPairs() {
          response = await api.getPlaylistPairs();
          if (response.data.success) {
            let pairsArray = response.data.idNamePairs;
            storeReducer({
              type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
              payload: pairsArray,
            });
          }
        }
        getListPairs();
      }
    }
    asyncPublishPlaylist();
  };

  store.addCommentById = function (id, comment) {
    // console.log(comment);
    async function asyncAddCommentById(id, comment) {
      let response = await api.getPlaylistById(id);
      if (response.data.success) {
        let playlist = response.data.playlist;
        playlist.comments.push(comment);
        response = await api.updatePlaylistById(playlist._id, playlist);
        if (response.data.success) {
          // console.log(response);
          store.getListPairs();
        }
      }
    }
    asyncAddCommentById(id, comment);
  }

  store.getListPairs = async function getListPairs() {
    let response;
    if (store.currentScreen === "home") {
      response = await api.getPlaylistPairs();
      if (response.data.success) {
        let pairsArray = response.data.idNamePairs;
        storeReducer({
          type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
          payload: pairsArray,
        })
      }
    }
    else if (store.currentScreen === "allList" || store.currentScreen === "user") {
      response = await api.getPublishedPlaylistPairs();
      if (response.data.success) {
        let pairsArray = response.data.pairs;
        storeReducer({
          type: GlobalStoreActionType.LOAD_PUBLISH_LIST_PAIRS,
          payload: pairsArray,
        })
      }
    }
    else return;
  }

  store.likePlaylistById = function (id) {
    async function asyncLikePlaylistById(id) {
      let response = await api.getPlaylistById(id);
      if (response.data.success) {
        let playlist = response.data.playlist;
        playlist.likes = playlist.likes + 1;
        response = await api.updatePlaylistById(playlist._id, playlist);
        if (response.data.success) {
          store.getListPairs();
        }
      }
    }
    asyncLikePlaylistById(id);
  }

  store.dislikePlaylistById = function (id) {
    async function asyncdislikePlaylistById(id) {
      let response = await api.getPlaylistById(id);
      if (response.data.success) {
        let playlist = response.data.playlist;
        playlist.dislikes = playlist.dislikes + 1;
        response = await api.updatePlaylistById(playlist._id, playlist);
        if (response.data.success) {
          store.getListPairs();
        }
      }
    }
    asyncdislikePlaylistById(id);
  }

  // THIS FUNCTION PROCESSES CHANGING A LIST NAME
  store.changeListName = function (id, newName) {
    // GET THE LIST
    async function asyncChangeListName(id) {
      let response = await api.getPlaylistById(id);
      if (response.data.success) {
        let playlist = response.data.playlist;
        playlist.name = newName;
        async function updateList(playlist) {
          response = await api.updatePlaylistById(
            playlist._id,
            playlist
          );
          if (response.data.success) {
            async function getListPairs(playlist) {
              response = await api.getPlaylistPairs();
              if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                  type: GlobalStoreActionType.CHANGE_LIST_NAME,
                  payload: {
                    idNamePairs: pairsArray,
                    playlist: playlist,
                  },
                });
              }
            }
            getListPairs(playlist);
          }
        }
        updateList(playlist);
      }
    }
    asyncChangeListName(id);
  };

  // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
  store.closeCurrentList = function () {
    storeReducer({
      type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
      payload: {},
    });
    history.push("/");
    tps.clearAllTransactions();
  };

  // THIS FUNCTION CREATES A NEW LIST
  store.createNewList = function () {
    async function asyncCreateNewList() {
      let newListName = "Untitled" + store.newListCounter;
      const response = await api.createPlaylist(
        newListName,
        [],
        auth.user.email,
        auth.user.userName,
      );
      // console.log("createNewList response: " + response);
      if (response.status === 201) {
        tps.clearAllTransactions();
        let newList = response.data.playlist;
        let result = await api.getPlaylistPairs();
        console.log(result);
        if (result.data.success) {
          let pairsArray = result.data.idNamePairs;
          storeReducer({
            type: GlobalStoreActionType.CREATE_NEW_LIST,
            payload: {
              idNamePairs: pairsArray,
              playlist: newList,
            },
          });
        }

        console.log(newList);
        // IF IT'S A VALID LIST THEN LET'S START EDITING IT
      } else {
        console.log("API FAILED TO CREATE A NEW LIST");
      }
    }
    asyncCreateNewList();
  };

  // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
  store.loadIdNamePairs = function () {
    async function asyncLoadIdNamePairs() {
      const response = await api.getPlaylistPairs();
      if (response.data.success) {
        let pairsArray = response.data.idNamePairs;
        storeReducer({
          type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
          payload: pairsArray,
        });
      } else {
        console.log("API FAILED TO GET THE LIST PAIRS");
      }
    }
    asyncLoadIdNamePairs();
  };

  store.getPublishedPlaylistPairs = function () {
    async function asyncGetPublishedPlaylistPairs() {
      const response = await api.getPublishedPlaylistPairs();
      if (response.data.success) {
        let pairsArray = response.data.pairs;
        storeReducer({
          type: GlobalStoreActionType.GET_PUBLISHED_PLAYLIST_PAIRS,
          payload: pairsArray,
        });
      } else {
        console.log("API FAILED TO GET THE LIST PAIRS");
      }
    }
    asyncGetPublishedPlaylistPairs();
  }

  // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
  // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
  // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
  // showDeleteListModal, and hideDeleteListModal
  store.markListForDeletion = function (id) {
    async function getListToDelete(id) {
      let response = await api.getPlaylistById(id);
      if (response.data.success) {
        let playlist = response.data.playlist;
        storeReducer({
          type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
          payload: { id: id, playlist: playlist },
        });
      }
    }
    getListToDelete(id);
  };

  // unmark List for deletion ->
  store.unmarkListForDeletion = function () {
    storeReducer({
      type: GlobalStoreActionType.UNMARK_LIST_FOR_DELETION,
      payload: null,
    });
  };

  store.deleteList = function (id) {
    async function processDelete(id) {
      let response = await api.deletePlaylistById(id);
      console.log(response);
      if (response.data.success) {
        store.loadIdNamePairs();
        history.push("/");
      }
    }
    processDelete(id);
  };
  store.deleteMarkedList = function () {
    store.deleteList(store.listIdMarkedForDeletion);
    store.hideModals();
  };
  // THIS FUNCTION SHOWS THE MODAL FOR PROMPTING THE USER
  // TO SEE IF THEY REALLY WANT TO DELETE THE LIST

  store.showEditSongModal = (songIndex, songToEdit) => {
    storeReducer({
      type: GlobalStoreActionType.EDIT_SONG,
      payload: { currentSongIndex: songIndex, currentSong: songToEdit },
    });
  };
  store.showRemoveSongModal = (songIndex, songToRemove) => {
    storeReducer({
      type: GlobalStoreActionType.REMOVE_SONG,
      payload: { currentSongIndex: songIndex, currentSong: songToRemove },
    });
  };
  store.hideModals = () => {
    storeReducer({
      type: GlobalStoreActionType.HIDE_MODALS,
      payload: {},
    });
  };
  store.isDeleteListModalOpen = () => {
    return store.currentModal === CurrentModal.DELETE_LIST;
  };
  store.isEditSongModalOpen = () => {
    return store.currentModal === CurrentModal.EDIT_SONG;
  };
  store.isRemoveSongModalOpen = () => {
    return store.currentModal === CurrentModal.REMOVE_SONG;
  };

  // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
  // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
  // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
  // moveItem, updateItem, updateCurrentList, undo, and redo
  store.setCurrentList = function (id) {
    async function asyncSetCurrentList(id) {
      let response = await api.getPlaylistById(id);
      if (response.data.success) {
        let playlist = response.data.playlist;
        storeReducer({
          type: GlobalStoreActionType.SET_CURRENT_LIST,
          payload: playlist,
        });
      }
    }
    asyncSetCurrentList(id);
  };

  store.setListToPlay = function (id) {
    async function asyncSetListToPlay(id) {
      let response = await api.getPlaylistById(id);
      if (response.data.success) {
        let playlist = response.data.playlist;
        storeReducer({
          type: GlobalStoreActionType.SET_LIST_TO_PLAY,
          payload: playlist,
        })
      }
    }
    asyncSetListToPlay(id);
  }

  store.getPlaylistSize = function () {
    return store.currentList.songs.length;
  };
  store.addNewSong = function () {
    let index = this.getPlaylistSize();
    this.addCreateSongTransaction(index, "Untitled", "?", "dQw4w9WgXcQ");
  };
  // THIS FUNCTION CREATES A NEW SONG IN THE CURRENT LIST
  // USING THE PROVIDED DATA AND PUTS THIS SONG AT INDEX
  store.createSong = function (index, song) {
    let list = store.currentList;
    list.songs.splice(index, 0, song);
    // NOW MAKE IT OFFICIAL
    store.updateCurrentList();
  };
  // THIS FUNCTION MOVES A SONG IN THE CURRENT LIST FROM
  // start TO end AND ADJUSTS ALL OTHER ITEMS ACCORDINGLY
  store.moveSong = function (start, end) {
    let list = store.currentList;

    // WE NEED TO UPDATE THE STATE FOR THE APP
    if (start < end) {
      let temp = list.songs[start];
      for (let i = start; i < end; i++) {
        list.songs[i] = list.songs[i + 1];
      }
      list.songs[end] = temp;
    } else if (start > end) {
      let temp = list.songs[start];
      for (let i = start; i > end; i--) {
        list.songs[i] = list.songs[i - 1];
      }
      list.songs[end] = temp;
    }

    // NOW MAKE IT OFFICIAL
    store.updateCurrentList();
  };
  // THIS FUNCTION REMOVES THE SONG AT THE index LOCATION
  // FROM THE CURRENT LIST
  store.removeSong = function (index) {
    let list = store.currentList;
    list.songs.splice(index, 1);

    // NOW MAKE IT OFFICIAL
    store.updateCurrentList();
  };
  // THIS FUNCTION UPDATES THE TEXT IN THE ITEM AT index TO text
  store.updateSong = function (index, songData) {
    let list = store.currentList;
    let song = list.songs[index];
    song.title = songData.title;
    song.artist = songData.artist;
    song.youTubeId = songData.youTubeId;

    // NOW MAKE IT OFFICIAL
    store.updateCurrentList();
  };
  store.addNewSong = () => {
    let playlistSize = store.getPlaylistSize();
    store.addCreateSongTransaction(
      playlistSize,
      "老人与海",
      "海明威",
      "LemZBWB1Deo"
    );
  };
  // THIS FUNCDTION ADDS A CreateSong_Transaction TO THE TRANSACTION STACK
  store.addCreateSongTransaction = (index, title, artist, youTubeId) => {
    // ADD A SONG ITEM AND ITS NUMBER
    let song = {
      title: title,
      artist: artist,
      youTubeId: youTubeId,
    };
    let transaction = new CreateSong_Transaction(store, index, song);
    tps.addTransaction(transaction);
  };
  store.addMoveSongTransaction = function (start, end) {
    let transaction = new MoveSong_Transaction(store, start, end);
    tps.addTransaction(transaction);
  };
  // THIS FUNCTION ADDS A RemoveSong_Transaction TO THE TRANSACTION STACK
  store.addRemoveSongTransaction = () => {
    let index = store.currentSongIndex;
    let song = store.currentList.songs[index];
    let transaction = new RemoveSong_Transaction(store, index, song);
    tps.addTransaction(transaction);
  };
  store.addUpdateSongTransaction = function (index, newSongData) {
    let song = store.currentList.songs[index];
    let oldSongData = {
      title: song.title,
      artist: song.artist,
      youTubeId: song.youTubeId,
    };
    let transaction = new UpdateSong_Transaction(
      this,
      index,
      oldSongData,
      newSongData
    );
    tps.addTransaction(transaction);
  };
  store.updateCurrentList = function () {
    async function asyncUpdateCurrentList() {
      const response = await api.updatePlaylistById(
        store.currentList._id,
        store.currentList
      );
      if (response.data.success) {
        storeReducer({
          type: GlobalStoreActionType.SET_CURRENT_LIST,
          payload: store.currentList,
        });
      }
    }
    asyncUpdateCurrentList();
  };
  store.undo = function () {
    tps.undoTransaction();
  };
  store.redo = function () {
    tps.doTransaction();
  };
  store.canAddNewSong = function () {
    return store.currentList !== null;
  };
  store.canUndo = function () {
    return store.currentList !== null && tps.hasTransactionToUndo();
  };
  store.canRedo = function () {
    return store.currentList !== null && tps.hasTransactionToRedo();
  };
  store.canClose = function () {
    return store.currentList !== null;
  };

  // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
  store.setIsListNameEditActive = function () {
    storeReducer({
      type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
      payload: null,
    });
  };

  return (
    <GlobalStoreContext.Provider
      value={{
        store,
      }}
    >
      {props.children}
    </GlobalStoreContext.Provider>
  );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };
