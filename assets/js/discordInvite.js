var discordInvite = discordInvite || function() {
    var settings = new Map();
    var version = "1.0";

    return {
        init: function(e) {
            const config = {
                inviteCode: void 0 !== e.inviteCode && e.inviteCode,
                title: void 0 !== e.title ? e.title : "",
                introText: void 0 !== e.introText ? e.introText : "YOU'VE BEEN INVITED TO JOIN A SERVER",
                joinText: void 0 !== e.joinText ? e.joinText : "Join",
                joinedText: void 0 !== e.joinedText ? e.joinedText : "Joined",
                width: void 0 !== e.width ? e.width : 400,
                miniMode: void 0 !== e.miniMode && e.miniMode,
                hideIntro: void 0 !== e.hideIntro && e.hideIntro,
                targetElement: void 0 !== e.targetElement ? e.targetElement : "#discordInviteBox"
            };
            settings.set(e.inviteCode, config);
        },
        render: function() {
            if (window.jQuery) {
                renderAll();
            } else {
                var t = document.createElement("script");
                t.type = "text/javascript";
                t.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js";
                document.head.appendChild(t);
                t.onload = function() {
                    renderAll();
                }
            }

            function renderAll() {
                settings.forEach((i, discordCode) => {
                    if (discordCode && "" != discordCode) {
                        i.miniMode ? i.width = "auto" : "number" == typeof i.width && (i.width = i.width + "px");
                        
                        var uniqueId = `discord-${discordCode}`;
                        
                        // Clear existing content
                        $(i.targetElement).empty();
                        
                        var t = `<div id="discordInvite" class="${uniqueId}" style="width: ${i.width};"><h5 id="introText" class="noselect loadHidden">${i.introText}</h5><div id="discordData"><div id="serverImg" class="discordLink loadHidden" style="background: rgb(54, 57, 63) repeat scroll 50% 50% / 100% 100% padding-box padding-box;"></div><div id="discordInfo"><div id="serverNameBox" class="discordLink"><span class="noselect" id="serverName">${i.title}</span></div><div id="status" class="loadHidden"><div id="statusIndicators" class="noselect"><i id="onlineInd"></i><span id="numOnline">... Online</span><i id="offlineInd"></i><span id="numTotal">... Members</span></div></div></div><button type="button" class="discordLink" id="callToAction"><div id="buttonText" class="noselect">${i.joinText}</div></button></div></div>`;
                        var d = `<div id="joinedDiscord">${i.joinedText}<svg name="Checkmark" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" id="discordSVG"><g fill="none" fill-rule="evenodd" id="gDiscord"><polyline stroke="currentColor" stroke-width="2" points="3.5 9.5 7 13 15 5" id="discordPoly"></polyline></g></svg></div>`;
                        
                        $(i.targetElement).append(t);
                        
                        $.ajax({
                            url: "https://discordapp.com/api/v6/invite/" + discordCode + "?with_counts=true",
                            success: function(e) {
                                var t = e.approximate_member_count.toLocaleString("en") + " Members",
                                    o = e.approximate_presence_count.toLocaleString("en") + " Online",
                                    n = e.guild.name,
                                    r = "https://cdn.discordapp.com/icons/" + e.guild.id + "/" + e.guild.icon + ".jpg";
                                $(`.${uniqueId} #serverName`).html(n);
                                $(`.${uniqueId} #serverImg`).css("background-image", "url(" + r + ")");
                                $(`.${uniqueId} #numTotal`).html(t);
                                $(`.${uniqueId} #numOnline`).html(o);
                                $(`.${uniqueId} .discordLink`).off('click').click(function() {
                                    $(`.${uniqueId} #callToAction`).html(d).attr("id", "callToAction-clicked");
                                    window.open("https://discordapp.com/invite/" + discordCode, "_blank");
                                });
                                $(`.${uniqueId} .loadHidden`).show();
                                if (i.miniMode) $(`.${uniqueId} #offlineInd, .${uniqueId} #numTotal`).hide();
                                if (i.hideIntro) $(`.${uniqueId} #introText`).hide();
                            },
                            error: function(err) {
                                $(`.${uniqueId} #discordInvite`).css("width", "auto");
                                var e = null;
                                if (void 0 !== err.responseJSON) {
                                    $(`.${uniqueId} #buttonText`).html(err.responseJSON.message);
                                    $(`.${uniqueId} #discordInfo`).remove();
                                } else {
                                    $(`.${uniqueId} #discordData`).remove();
                                    e = true;
                                }
                                $(`.${uniqueId} #introText`).html(e ? "ERROR: Invalid Data URL." : "An error has occurred.").css("margin", 0).show();
                            }
                        });
                    }
                });
            }
        }
    }
}();