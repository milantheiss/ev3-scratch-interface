class ScratchFetch {
    url
    availableUnits

    constructor() {
        this.getAvailableUnits()
            .then(r => {
                this.availableUnits = r
                this.setURL({index: 0})
            })
    }

    async getInfo() {
        return {
            "id": "MilanTheissEv3ScratchInterface",
            "name": "EV3 Scratch Interface",
            "blocks": [
                {
                    "opcode": "forwards",
                    "blockType": "command",
                    "text": "Fahre vorwärts [distanceInCM] cm",
                    "arguments": {
                        "distanceInCM": {
                            "type": "number",
                            "defaultValue": 35
                        },
                    }
                },
                {
                    "opcode": "backwards",
                    "blockType": "command",
                    "text": "Fahre rückwärts [distanceInCM] cm",
                    "arguments": {
                        "distanceInCM": {
                            "type": "number",
                            "defaultValue": 35
                        },
                    }
                },
                {
                    "opcode": "simpleTurnLeft",
                    "blockType": "command",
                    "text": "Rotiere 90 Grad linksherum",
                },
                {
                    "opcode": "simpleTurnRight",
                    "blockType": "command",
                    "text": "Rotiere 90 Grad rechtsherum",
                },
                {
                    "opcode": "simpleForwards",
                    "blockType": "command",
                    "text": "Fahre 35 cm vorwärts"
                },
                {
                    "opcode": "simpleBackwards",
                    "blockType": "command",
                    "text": "Fahre 35 cm rückwärts"
                },
                {
                    "opcode": "turn",
                    "blockType": "command",
                    "text": "Dreh dich um [degrees] Grad",
                    "arguments": {
                        "degrees": {
                            "type": "number",
                            "defaultValue": 90
                        },
                    }
                },
                {
                    "opcode": "setURL",
                    "blockType": "command",
                    "text": "Führe auf dem [unitName] aus",
                    "arguments": {
                        "unitName": {
                            "type": "text",
                            "menu": "units"
                        }
                    }
                }
            ],
            "menus": {
                "units": (await this.getAvailableUnits()).map(val => val.name),
            }
        };
    }

    // INFO Fetch Requests mode: cors & new Header: ngrok-skip-browser-warning
    forwards({distanceInCM = 35}) {
        const timeout = distanceInCM / 12.5
        return fetch([this.url, "/forwards?timeout=", timeout, "&speed=34.7222222"].join(""), {
            mode: "cors",
            headers: new Headers({
                "ngrok-skip-browser-warning": "69420"
            })
        }).then(response => response.text())
    }

    backwards({distanceInCM = 35}) {
        const timeout = distanceInCM / 12.5
        return fetch([this.url, "/backwards?timeout=", timeout, "&speed=34.7222222"].join(""), {
            mode: "cors",
            headers: new Headers({
                "ngrok-skip-browser-warning": "69420"
            })
        }).then(response => response.text())
    }

    turn({degrees = 90}) {
        return fetch([this.url, "/turn?degrees=", degrees].join(""), {
            mode: "cors",
            headers: new Headers({
                "ngrok-skip-browser-warning": "69420"
            })
        }).then(response => response.text())
    }

    simpleForwards(){
        return this.forwards({distanceInCM: 35})
    }

    simpleBackwards() {
        return this.backwards({distanceInCM: 35})
    }

    simpleTurnLeft(){
        return this.turn({degrees: -90})
    }

    simpleTurnRight(){
        return this.turn({degrees: 90})
    }
    setURL({unitName = undefined, index = 0}) {
        if (typeof unitName !== "undefined") {
            console.log(unitName)
            this.url = this.availableUnits.find(val => val.name === unitName).url
        } else {
            this.url = this.availableUnits[index].url
        }

        console.log(`Ausgewählte URL: ${this.url}`)
    }

    async getAvailableUnits(){
        let res = await fetch(`https://allorigins.hexlet.app/raw?url=https://gist.githubusercontent.com/milantheiss/9364995837bbd94ed548857c5b9f7f70/raw/localtunnels.json&disableCache=true`)
        res = await res.text()
        res = JSON.parse(res)
        console.log(res)
        return res
    }
}

Scratch.extensions.register(new ScratchFetch())