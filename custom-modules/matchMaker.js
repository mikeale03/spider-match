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
  }
  
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
  //console.log(result);
  return result;
}

export const getMatch = (participant1, participant2, targetDif=0) => {
  let spiders2 = [...participant2.spiders];
  let match = [];
  let nxtMinDif = 99999999;
  let ind = 1;
  let spiders1 = participant1.spiders.filter((item) => {
    let result = findMinDif(spiders2, item.weight, ind);
    ind = result.index;
    if(result.dif === targetDif) {

      match.push({
        key:Date.now().toString()+(ctr++),
        match: [item, spiders2[result.index] ] 
      });

      spiders2 = spiders2.filter((item, index2) => index2 !== result.index );
      //nxtMinDif = targetDif;
      return false;
    } else {
      nxtMinDif = result.dif < nxtMinDif ? result.dif : nxtMinDif; 
      return true;
    }
  });
  
  const p1 = {...participant1, spiders:spiders1};
  const p2 = {...participant2, spiders:spiders2}
  let newResult = {
    match,
    p1spidersNotMatch: p1,
    p2spidersNotMatch: p2,
    nxtMinDif,
    targetDif,
  }
  
  return newResult;
}


export const getMatchFromParticipants = (participants,participant, targetDif = 0) => {
  const spiders = [...participant.spiders];
  let participantCopy = {...participant, spiders};
  const len = participants.length;
  let result;
  var match = [];
  let nxtMinDif = 99999999;
  let participantsSpidersNotMatch = [];
  for(let i=0; i<len; i++) {
    result = getMatch(participantCopy,participants[i],targetDif);
    match = match.concat(result.match);
    nxtMinDif = result.nxtMinDif < nxtMinDif ? result.nxtMinDif : nxtMinDif;
    participantCopy = result.p1spidersNotMatch;
    result.p2spidersNotMatch.spiders.length && participantsSpidersNotMatch.push(result.p2spidersNotMatch);
    if(participantCopy.spiders.length<1) {
      participantsSpidersNotMatch = participantsSpidersNotMatch.concat(participants.slice(i+1));
      break; 
    }
  }
  return {
    match,
    nxtMinDif,
    spidersNotMatch: participantCopy,
    participantsSpidersNotMatch,
  }
}

export const matchParticipants = ( participants, targetDif = 0, state = {
  match:[],
  notMatch:[],
  nxtMinDif:99999999,
}) => {
  
  if(participants.length<1) return state;
  
  let participant = participants[0];
  const newParticipants = participants.slice(1);
  let { match, notMatch, nxtMinDif } = state;
  
  let result = getMatchFromParticipants(newParticipants, participant, targetDif);
  //console.log(result);
  match = match.concat(result.match);
  
  nxtMinDif = result.nxtMinDif < nxtMinDif ? result.nxtMinDif : nxtMinDif;
  
  if(result.spidersNotMatch.spiders.length) 
    notMatch.push(result.spidersNotMatch);
  
  const newState = { match, notMatch, nxtMinDif };
  
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
    let { match, notMatch, nxtMinDif } = matchParticipants(participantsCopy, targetDif);
    len = notMatch.length;
    targetDif = nxtMinDif;
    allMatch = allMatch.concat(match);
    participantsCopy = notMatch;
  } while (len>1);
  return { 
    match:allMatch,
    notMatch:participantsCopy
  }
}