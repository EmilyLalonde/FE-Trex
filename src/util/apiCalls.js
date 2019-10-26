export const fetchMyTrips = async (user_id) => {
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  let queryParams = `{user(id: ${user_id}) {trips {id, name, startDate, endDate legs{name startDate endDate id tripId startLocation endLocation}}}}`

  let url = `https://secret-cliffs-17751.herokuapp.com/graphql?query=${queryParams}`

  try {
    let resp = await fetch(url, options)
    if (!resp.ok) {
      throw new Error('There was an error fetching your trips')
    }

    let data = await resp.json();
    let trips = data.data.user.trips;
    return trips;

  } catch (error) {
    throw error
  }
}

export const postNewTrip = async (tripInfo) => {

  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  let { name, startDate, endDate, userId } = tripInfo;  

  let queryParams = `mutation {createTrip(input: {name: "${name}", startDate: "${startDate}", endDate: "${endDate}", userId: ${userId}}) {trip {name startDate endDate id}}}`

  let url = `https://secret-cliffs-17751.herokuapp.com/graphql?query=${queryParams}`

  try {
    let resp = await fetch(url,options)
    if (!resp.ok) {
      throw new Error('There was an error creating your trip')
    }

    let data = await resp.json();
    return data.data.createTrip.trip
  
  } catch (error) {
    throw error
  }

}


export const patchTrip = async (tripInfo) => {
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  let { name, startDate, endDate, id } = tripInfo;  
  console.log('tripInfo', tripInfo)

  let queryParams = `mutation {updateTrip(input: {name: "${name}", startDate: "${startDate}", endDate: "${endDate}", id: ${id}}) {trip {name startDate endDate id}}}`

  let url = `https://secret-cliffs-17751.herokuapp.com/graphql?query=${queryParams}`

  try {
    let resp = await fetch(url, options);

    if (!resp.ok) {
      throw new Error('There was an error editing your trip')
    }

    let data = await resp.json();
    console.log(data.data.updateTrip.trip)
    return data.data.updateTrip.trip
  
  } catch (error) {
    throw error
  }
}

export const deleteTrip = async (tripId) => {

  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }


  let queryParams = `mutation {removeTrip(input: {id: "${tripId}"}) {trip {name}}}`

  let url = `https://secret-cliffs-17751.herokuapp.com/graphql?query=${queryParams}`

  try {
    let resp = await fetch(url, options);
    
    if (!resp.ok) {
      throw new Error('There was an error deleting your trip')
    }

    let data = await resp.json();
    return data.data.removeTrip.trip

  } catch (error) {
    throw error
  }

}