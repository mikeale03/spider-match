export const addNotMatchObj = (notMatch, match) => {
    console.log(match);
    let isItem1Found  = false;
    let isItem2Found = false;
    let newNotMatch = notMatch.map((item) => {
        if (item.key === match.spiders[0].parentKey) {
            let spiders = [...item.spiders, match.spiders[0]]
            spiders.sort((a,b) => a.weight - b.weight);
            isItem1Found = true;
            return {...item, spiders};

        } else if (item.key === match.spiders[1].parentKey) {
            let spiders = [...item.spiders, match.spiders[1]];
            spiders.sort((a,b) => a.weight - b.weight);
            isItem2Found = true;
            return {...item, spiders}
        } else
            return item;
    });

    if(!isItem1Found) {
        const participant = {
            key: match.spiders[0].parentKey,
            name: match.spiders[0].participantName,
            alliesKey: match.spiders[0].alliesKey,
            spiders:[{...match.spiders[0]}],
        };
        newNotMatch.push(participant);
    }
        
    if(!isItem2Found) {
        const participant = {
            key: match.spiders[1].parentKey,
            name: match.spiders[1].participantName,
            alliesKey: match.spiders[1].alliesKey,
            spiders:[{...match.spiders[1]}],
        };
        newNotMatch.push(participant);
    }
    return newNotMatch;
}

export const addNotMatchArr = (notMatch, matches) => {
    let len = matches.length;
    let newNotMatch = [...notMatch];
    for(let i=0; i<len; i++) {
        newNotMatch = addNotMatchObj(newNotMatch, matches[i]);
    }
    return newNotMatch;
}

export const removeNotMatch = (notMatch, match) => {
    const {spiders} = match;
    const newNotMatch = notMatch.reduce((acc, item) => {
        if(item.key === spiders[0].parentKey) {
          const newSpiders = item.spiders.filter((val) => val.key !== spiders[0].key );
          acc.push({...item, spiders:newSpiders});
  
        } else if (item.key === spiders[1].parentKey) {
          const newSpiders = item.spiders.filter((val) => val.key !== spiders[1].key );
          acc.push({...item, spiders:newSpiders});
        } else
          acc.push(item);
        return acc;
      },[]);
      
    return newNotMatch;
}

export const generateNotMatch = (participants, matches) => {
    
    return participants.reduce((acc, participant) => {
        let spiders = participant.spiders;
        const l = matches.length;
        spiders = spiders.filter((spider) => {
            for(let i = 0; i<l; i++) {
                if(matches[i].spiders[0].key === spider.key) {
                    return false;
                } else if(matches[i].spiders[1].key === spider.key) {
                    return false;
                } 
            }
            return true;
        });
        if(spiders.length) {
            acc.push({...participant, spiders});
        }
        return acc;
    },[])
}