export const getProfileList = () => {
    const profileList = [];
    
    for (let i = 0; i < 15; i++) {
        profileList.push({
            id: 'p' + i,
            image: '/images/profiles/image-' + (i + 1) + '.jpg',
        });
    }

    return profileList;
}

export const getProfileImage = (rand: number = 0) => {
    const profileList = getProfileList();
    return profileList?.[rand]?.image;
}

export const getRandomNumber = (mi: number = 0, mx: number = 14) => {
    return Math.floor(Math.random() * (mx - mi)) + mi || 0;
}