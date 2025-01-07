const servers = [
    { inviteCode: '283JBXufXm', title: 'PistonProjects Support', introText: 'My server where I publish my projects:' },
    { inviteCode: 'eKeeZPq6SJ', title: 'PistonCubeBOT Support', introText: 'Support for my Minecraft bot:' },
    { inviteCode: 'qEPeKqpXzu', title: '2b2t Argentina Server', introText: 'Official Discord of 2b2t Argentina:' },
    { inviteCode: 'FxDZQTMxPh', title: 'MineArgento Server', introText: 'Official Discord of MineArgento:' },
    { inviteCode: 'xqQCHk5JwU', title: 'ZuruBOT', introText: 'Join the ZuruBOT Support Discord:' },
    { inviteCode: '5sgp2TW5mp', title: 'HidenCloud Server', introText: 'Join the HidenCloud Support Discord:' },
    { inviteCode: 'MaXTXuXA6s', title: 'ResistenciaBananera', introText: 'Join the ResistenciaBananera Discord:' },
    { inviteCode: 'nbYFdHXjFw', title: 'CubeStone Studios', introText: 'Join the official CubeStone Studios Discord:' },
    { inviteCode: '3un38K8ZJd', title: 'GamersLatinos', introText: 'Join the official GamerLatinos Discord:' },
    { inviteCode: 'T68FzkYDAg', title: 'Astros Ads', introText: 'Join my advertising server:' }
];

servers.forEach(server => {
    const container = document.createElement('div');
    container.id = `discordInviteBox-${server.inviteCode}`;
    container.classList.add('discordInviteBox');
    document.getElementById('discordInvitesContainer').appendChild(container);

    discordInvite.init({
        inviteCode: server.inviteCode,
        title: server.title,
        introText: server.introText,
        targetElement: `#discordInviteBox-${server.inviteCode}`
    });
});

// Single render call after all invites are initialized
discordInvite.render();