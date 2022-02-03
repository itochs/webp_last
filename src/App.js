import React, { useState, useEffect, useRef, useReducer, Fragment } from 'react';
import Moveable from 'react-moveable';
import { Menu, Item, Separator, Submenu, useContextMenu } from 'react-contexify';
import "react-contexify/dist/ReactContexify.css"
import LeaderLine from 'leader-line-new';
import './App.css';
import { Header, Footer } from './sub_content';

function EditFrom(props) {
    const [text, setText] = useState(props.initText);
    const addText = useRef(null);
    const [isEd, setIsEd] = useState(false);
    function handleEditing(e) {
        e.preventDefault();
        setIsEd(true);
    }
    function handleSaveText(e) {
        e.preventDefault();
        // if (!text) return;
        setIsEd(false);
        setText(addText.current.value)
        console.log(text)
    }
    useEffect(() => {
        if (isEd) {
            props.changeMove(false)
        }
    }, [isEd])
    return (
        <div className={props.moveClassName}>
            {isEd ? (
                <form
                    className='field'
                    onSubmit={handleSaveText}>
                    <input
                        className='input'
                        type="text"
                        ref={addText}
                        value={text}
                        onChange={(e) => { setText(e.target.value) }}
                    />
                    <button
                        className='button'
                        type='submit'>Save</button>
                </form>
            ) : (
                <form
                    className='field'
                    onSubmit={handleEditing}>
                    <div>
                        <span className='label'>{text}</span>
                        {
                            props.moving ? (
                                <div />
                            ) : (
                                <button
                                    className='button'
                                    type='submit'>Edit</button>
                            )
                        }

                    </div>
                </form>
            )
            }
        </div >
    )
}
function Form(props) {
    const [texts, setTexts] = useState([]);
    const addText = useRef(null);

    function handleSubmit(event) {
        event.preventDefault();
        if (addText.current.value) {
            texts.push(addText.current.value)
            setTexts([...texts])
            addText.current.value = "";
            props.openItems(texts)
        }
    }

    return (
        <div>
            <form
                className='field'
                onSubmit={handleSubmit} >
                <button
                    className='button'
                    type='submit'> PLUS </button>
                <input
                    className='input'
                    ref={addText} type="text"
                    placeholder='type this area'></input>
            </form>
        </div>
    )
}

function Contents(props) {
    const MENU_ID = "menu-id";
    const { show } = useContextMenu({ id: MENU_ID });
    const [curEl, setCurEl] = useState(null);

    function handleItemClick({ event }) {
        switch (event.currentTarget.id) {
            case "from":
                console.log("from!!!!!")
                props.handleItemClickFrom(curEl);
                break;
            case "to":
                console.log("to!!!!!!!")
                props.handleItemClickTo(curEl);
                break;
            case "edit":
                console.log("edit!!")
                console.log("element", curEl)
                break;
        }
    }
    function displayMenu(e) {
        show(e)
        setCurEl(e.currentTarget)
    }

    return (
        <div className='container'>
            {
                (props.texts).map((text, index) => {
                    return (
                        <div >
                            <div
                                onContextMenu={displayMenu}
                                key={text}
                                id={text}
                                className='move-target'
                            // onClick={() => { onClick(index) }}
                            >
                                {/* {text} */}
                                <EditFrom moveClassName="child" changeMove={props.changeMove} moving={props.moving} initText={text} />
                            </div>
                        </div>
                    )
                })
            }
            <Menu id={MENU_ID}>
                <Item id="from" onClick={handleItemClick}>
                    From
                </Item>
                <Item id='to' onClick={handleItemClick}>
                    To
                </Item>
                {/* <Separator />
                <Item id='edit' onClick={handleItemClick}>Edit</Item> */}
            </Menu>
        </div >
    )
}

function MoveSet(props) {
    // const [display, setDisplay] = useState(props.display)
    const [targets, setTargets] = useState([])
    const [frames, setFrames] = useState([{
        translate: [0, 0],
    }, {
        translate: [0, 0]
    }]);

    useEffect(() => {
        const parents = [...document.querySelectorAll('.move-target')];
        let all = [];
        let trans = [];
        let display = [];
        parents.forEach((el) => {
            display.push(false)
            all.push([el, el.firstElementChild])
            trans.push([{
                translate: [0, 0],
            }, {
                translate: [0, 0]
            }]);
        })
        setTargets([...all]);
        setFrames([...trans])
    }, [props.content])

    return (
        <div>
            {/* <p> move set items </p> */}
            {targets.map((divs, divId) => {
                return (
                    props.moving ? (
                        <Moveable
                            key={`${divs[0].getAttribute('id') + divs[0].getAttribute('class')}`}
                            target={divs}
                            draggable={true}
                            origin={false}
                            checkInput={true}
                            onDragGroupStart={({ events }) => {
                                events.forEach((ev, i) => {
                                    ev.set(frames[divId][i].translate)
                                })
                            }}
                            onDragGroup={({ events }) => {
                                events.forEach((ev, i) => {
                                    if (i === 0) {
                                        frames[divId][i].translate = ev.beforeTranslate;
                                        ev.target.style.transform = `translate(${ev.beforeTranslate[0]}px, ${ev.beforeTranslate[1]}px)`;
                                    }
                                })
                            }}
                        />
                    ) : (
                        <div />
                    )
                )
            })}
        </div >
    )
}

function Main() {
    const [texts, setDivtexts] = useState([]);

    const [links, setLinks] = useState([]);
    const [targets, setTargets] = useState([]);
    const [from, setFrom] = useState([]);
    const [to, setTo] = useState([]);

    const [moving, setMoving] = useState(false)

    function openItems(divtexts) {
        setDivtexts([...divtexts])
    }

    function handleChangeMove(event) {
        event.preventDefault();
        setMoving(!moving)
    }

    function changeMove(value) {
        setMoving(value)
        console.log("move", moving)
    }

    function handleItemClickFrom(target) {
        let isPush = true;
        for (let t of targets) {
            if (t[0] === target) {
                isPush = false;
                break;
            }
        }
        if (isPush) {
            targets.push([target]);
            setTargets([...targets])
        }
        setFrom(target)
    }
    function handleItemClickTo(target) {
        if (from) {
            for (let i in targets) {
                if (targets[i][0] === from) {
                    targets[i].push(target);
                    targets[i] = [...new Set(targets[i])]
                    setTo(target)
                    setTargets([...targets])
                    break;
                }
            }
        }
    }

    function makeLinks() {
        if (links.length > 0) {
            console.log(links)
            links.filter((l) => {
                l.remove();
            })
        }
        let link = [];
        // setLinks(link);
        targets.map((tars) => {
            console.log(tars)
            if (tars.length > 1) {
                tars.map((el) => {
                    // want connect
                    if (tars[0] !== el) {
                        link.push(new LeaderLine(tars[0], el, { color: "red", size: 8 }));
                    }
                })
            }
        })
        setLinks(link);
    }

    useEffect(() => {
        console.log("from", from)
        console.log("to", to)

        makeLinks();

    }, [targets])


    return (
        <div onClick={makeLinks}>
            <form
                className='field'
                onSubmit={handleChangeMove}>
                {moving ? (
                    <button
                        className='button'
                        type='submit'>STOP</button>
                ) : (
                    <button
                        className='button'
                        type='submit'>MOVE</button>
                )
                }

            </form>
            <Form openItems={openItems} />
            <Contents
                {...{ texts, handleItemClickFrom, handleItemClickTo, changeMove, moving }} />
            <MoveSet
                content={texts} {...{ moving }}
            />
        </div >
    )
}

const App = () => {
    return (
        <React.Fragment >
            <Header />
            <Main />
            <Footer />
        </React.Fragment>
    );
};

export default App;