//this codes here need refactoring! Messy namings and redundant.

let ctr = 0;
export const findMinDif = (spiders, value, start=1) =>  {
  const len = spiders.length;
  let result = {};
  if (len) {
    let dif = value - spiders[0].weight;
    let absDif = Math.abs(dif);
    result.dif = absDif;
    result.index = 0;
    if(dif <= 0) 
      return result;
  } else return null;
  
  for(let i=start; i<len; i++) {
    let dif = value - spiders[i].weight;
    let absDif = Math.abs(dif);
    if(absDif < result.dif) {
      result.dif = absDif;
      result.index = i;
    }
    if(dif <=0) {
      break;
    }
  }
  return result;
}

export const getMatches = (participant1, participant2, targetDif=0) => {
  let matches = [];
  let nxtMinDif = 99999999;

  if(participant1.alliesKey !== null && participant2.alliesKey !== null) {
    if(participant1.alliesKey === participant2.alliesKey) {
      const p1 = {...participant1};
      const p2 = {...participant2};
      let newResult = {
        matches,
        p1spidersNotMatch: p1,
        p2spidersNotMatch: p2,
        nxtMinDif,
        targetDif,
        isAlly: true,
      }
      return newResult;
    }
  }

  let spiders1 = [...participant1.spiders];
  let spiders2 = [...participant2.spiders];
  
  let ind = 1;
  spiders1 = spiders1.filter((item) => {
    if(spiders2.length) {
      let result = findMinDif(spiders2, item.weight, ind);
      ind = result.index;
      if(result.dif === targetDif) {

        matches.push({
          key:Date.now().toString()+(ctr++),
          isMarked:false,
          match: [
            {...item, alliesKey:participant1.alliesKey},
            {...spiders2[result.index], alliesKey:participant2.alliesKey},
          ] 
        });

        spiders2 = spiders2.filter((item, index2) => index2 !== result.index );
        //nxtMinDif = targetDif;
        return false;
      } else {
        nxtMinDif = result.dif < nxtMinDif ? result.dif : nxtMinDif; 
        return true;
      }
    } else return true;
  });
  
  
  const p1 = {...participant1, spiders:spiders1};
  const p2 = {...participant2, spiders:spiders2}
  let newResult = {
    matches,
    p1spidersNotMatch: p1,
    p2spidersNotMatch: p2,
    nxtMinDif,
    targetDif,
    isAlly: false,
  }
  
  return newResult;
}


export const getMatchesFromParticipants = (participants,participant, targetDif = 0) => {
  const spiders = [...participant.spiders];
  let participantCopy = {...participant, spiders};
  const len = participants.length;
  let isAllAllies = true;
  var matches = [];
  let nxtMinDif = 99999999;
  let participantsSpidersNotMatch = [];
  for(let i=0; i<len; i++) {
    let result = getMatches(participantCopy,participants[i],targetDif);
    if(result.isAlly === false) isAllAllies = false;
    matches= matches.concat(result.matches);
    nxtMinDif = result.nxtMinDif < nxtMinDif ? result.nxtMinDif : nxtMinDif;
    participantCopy = result.p1spidersNotMatch;
    result.p2spidersNotMatch.spiders.length && participantsSpidersNotMatch.push(result.p2spidersNotMatch);
    if(participantCopy.spiders.length<1) {
      participantsSpidersNotMatch = participantsSpidersNotMatch.concat(participants.slice(i+1));
      break; 
    }
  }
  return {
    matches,
    nxtMinDif,
    spidersNotMatch: participantCopy,
    participantsSpidersNotMatch,
    isAllAllies
  }
}

export const matchParticipants = ( participants, targetDif = 0, state = {
  matches:[],
  notMatch:[],
  nxtMinDif:99999999,
  isAllAllies: true,
}) => {
  
  if(participants.length<1) return state;
  
  let participant = participants[0];
  const newParticipants = participants.slice(1);
  let { matches, notMatch, nxtMinDif, isAllAllies } = state;
  
  let result = getMatchesFromParticipants(newParticipants, participant, targetDif);
  if(result.isAllAllies === false) isAllAllies = false;
  
  matches = matches.concat(result.matches);
  
  nxtMinDif = result.nxtMinDif < nxtMinDif ? result.nxtMinDif : nxtMinDif;
  
  if(result.spidersNotMatch.spiders.length) 
    notMatch.push(result.spidersNotMatch);
  
  const newState = { matches, notMatch, nxtMinDif, isAllAllies };
  
  if(result.participantsSpidersNotMatch.length > 1) 
    return matchParticipants(result.participantsSpidersNotMatch,targetDif, newState);
  
  newState.notMatch = newState.notMatch.concat(result.participantsSpidersNotMatch);
  return newState;
}

export const matchAllParticipantsSpiders = (participants) => {
  let allMatch = [];
  let targetDif = 0;
  let participantsCopy = [...participants]
  let len;
  do {
    let { matches, notMatch, nxtMinDif, isAllAllies } = matchParticipants(participantsCopy, targetDif);
    len = notMatch.length;
    targetDif = nxtMinDif;
    allMatch = allMatch.concat(matches);
    participantsCopy = notMatch;
    if(isAllAllies) break;
  } while (len>1);
  return { 
    matches:allMatch,
    notMatch:participantsCopy
  }
}
// single match
export const getMatch = (participant1, participant2, targetDif=0) => {
  
  let nxtMinDif = 99999999;
  let match = null;

  if(participant1.alliesKey !== null && participant2.alliesKey !== null) {
    if(participant1.alliesKey === participant2.alliesKey) {
      const p1 = {...participant1};
      const p2 = {...participant2};
      let newResult = {
        match,
        p1spidersNotMatch: p1,
        p2spidersNotMatch: p2,
        nxtMinDif,
        targetDif,
        isAlly: true,
      }
      return newResult;
    }
  }

  let spiders1 = [...participant1.spiders];
  let spiders2 = [...participant2.spiders];

  if(spiders2.length) {
    let ind = 1;
    spiders1 = spiders1.filter((item) => {
      let result = findMinDif(spiders2, item.weight, ind);
      ind = result.index;
      if(result.dif === targetDif && match === null ) {

        match = {
          key:Date.now().toString()+(ctr++),
          match: [
            {...item, alliesKey:participant1.alliesKey},
            {...spiders2[result.index], alliesKey:participant2.alliesKey},
          ] 
        };
        spiders2 = spiders2.filter((item, index2) => index2 !== result.index );
        return false;

      } else {
        nxtMinDif = result.dif < nxtMinDif ? result.dif : nxtMinDif; 
        return true;
      }
    });
  }

  const p1 = {...participant1, spiders:spiders1};
  const p2 = {...participant2, spiders:spiders2}
  let newResult = {
    match,
    p1spidersNotMatch: p1,
    p2spidersNotMatch: p2,
    nxtMinDif,
    targetDif,
    isAlly:false,
  }
  return newResult;
}

export const getMatchFromParticipants = (participants,participant, targetDif = 0) => {
  const spiders = [...participant.spiders];
  let participantCopy = {...participant, spiders};
  const len = participants.length;
  let isAllAllies = true;
  var match = null;
  let nxtMinDif = 99999999;
  let participantsSpidersNotMatch = [];
  for(let i=0; i<len; i++) {
    let result = getMatch(participantCopy,participants[i],targetDif);
    if(result.isAlly === false) isAllAllies = false;
    match = result.match; 
    nxtMinDif = result.nxtMinDif < nxtMinDif ? result.nxtMinDif : nxtMinDif;
    participantCopy = result.p1spidersNotMatch;
    result.p2spidersNotMatch.spiders.length && participantsSpidersNotMatch.push(result.p2spidersNotMatch);

    if(match !== null || participantCopy.spiders.length<1) {
      participantsSpidersNotMatch = participantsSpidersNotMatch.concat(participants.slice(i+1));
      break;
    }
  }
  return {
    match,
    nxtMinDif,
    spidersNotMatch: participantCopy,
    participantsSpidersNotMatch,
    isAllAllies,
  }
}

export const getSingleMatch = ( participants, targetDif = 0, state = {
  match:null,
  notMatch:[],
  nxtMinDif:99999999,
  isAllAllies: true,
}) => {
  
  if(participants.length<1) return state;
  
  let participant = participants[0];
  const newParticipants = participants.slice(1);
  let { match, notMatch, nxtMinDif, isAllAllies } = state;
  
  let result = getMatchFromParticipants(newParticipants, participant, targetDif);
  if(result.isAllAllies === false) isAllAllies = false;
  
  match = result.match;
  
  nxtMinDif = result.nxtMinDif < nxtMinDif ? result.nxtMinDif : nxtMinDif;
  
  if(result.spidersNotMatch.spiders.length) 
    notMatch.push(result.spidersNotMatch);
  
  const newState = { match, notMatch, nxtMinDif, isAllAllies };
  
  if (match !== null) {
    newState.notMatch = newState.notMatch.concat(result.participantsSpidersNotMatch);
    return newState;
  }
  else if(result.participantsSpidersNotMatch.length > 1) 
    return getSingleMatch(result.participantsSpidersNotMatch,targetDif, newState);
  else {
    newState.notMatch = newState.notMatch.concat(result.participantsSpidersNotMatch);
    return newState;
  }
}

export const getSingleMatchWithLeastDif = (participants) => {
  let spiderMatch = null;
  let targetDif = 0;
  let participantsCopy = [...participants];
  let len = participants.length;

  if(len>1)
    do {
      let { match, notMatch, nxtMinDif, isAllAllies } = getSingleMatch(participantsCopy, targetDif);
      targetDif = nxtMinDif;
      spiderMatch = match;
      participantsCopy = notMatch;
      if(isAllAllies) break;
    } while (spiderMatch === null);

  return { 
    match:spiderMatch,
    notMatch:participantsCopy
  }
}