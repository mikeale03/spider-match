export const addNotMatchObj = (notMatch, {match}) => {
    let isItem1Found  = false;
    let isItem2Found = false;
    
    let newNotMatch = notMatch.map((item) => {
        if (item.key === match[0].parentKey) {
            let spiders = [...item.spiders, match[0]]
            spiders.sort((a,b) => a.weight - b.weight);
            isItem1Found = true;
            return {...item, spiders};

        } else if (item.key === match[1].parentKey) {
            let spiders = [...item.spiders, match[1]];
            spiders.sort((a,b) => a.weight - b.weight);
            isItem2Found = true;
            return {...item, spiders}
        } else
            return item;
    });

    if(!isItem1Found) {
        const participant = {
            key: match[0].parentKey,
            name: match[0].participantName,
            alliesKey: match[0].alliesKey,
            spiders:[{...match[0]}],
        };
        newNotMatch.push(participant);
    }
        
    if(!isItem2Found) {
        const participant = {
            key: match[1].parentKey,
            name: match[1].participantName,
            alliesKey: match[1].alliesKey,
            spiders:[{...match[1]}],
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
    const newNotMatch = notMatch.reduce((acc, item) => {
        if(item.key === match[0].parentKey) {
          const newSpiders = item.spiders.filter((val) => val.key !== match[0].key );
          acc.push({...item, spiders:newSpiders});
  
        } else if (item.key === match[1].parentKey) {
          const newSpiders = item.spiders.filter((val) => val.key !== match[1].key );
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
                if(matches[i].match[0].key === spider.key) {
                    return false;
                } else if(matches[i].match[1].key === spider.key) {
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