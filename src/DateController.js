function initLocalStroage(){
  
  /*
  * Todos {
  *   today: {
  *     date: 1/13/2021,
  *     data: {
  *       
  *     }
  *   },
  *   tomorrow: {
  *     date: 1/13/2021,
  *     data: {
  *     
  *     }
  *   }
  *  }
  */
  var localData = null;
  try {
    localData = JSON.parse(window.localStorage.getItem('Todos')) || {
      today: {
        date: new Date().toLocaleDateString(),
        data: []
      },
      tomorrow: {
        data: []
      }
    };
    if(localData) {
      if(localData.today.date !== new Date().toLocaleDateString()) {
        localData.today = {
          date: new Date().toLocaleDateString(),
          data: localData.tomorrow.data
        }
        localData.tomorrow = {
          data: []
        }
      }
    }
  }
  catch (e) {
    localData = JSON.parse(window.localStorage.getItem('Todos')) || {
      today: {
        date: new Date().toLocaleDateString(),
        data: []
      },
      tomorrow: {
        data: []
      }
    };
    console.log("Err", e)
  }
  // console.log(localData);
  // console.log(localData);
  return localData;
}

export default initLocalStroage;