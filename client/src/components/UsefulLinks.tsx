import React, { Component } from 'react'
import ironhackHomepage from '../images/IronhackHomepage.png';
import trelloHomepage from '../images/TrelloHomepage.png';
import githubHomepage from '../images/githubHomepage.png';
import codewarsHomepage from '../images/CodewarsHomepage.png';
import kahootHomepage from '../images/KahootHomepage.png';
import codepenHomepage from '../images/CodepenHomepage.png';
import replitHomepage from '../images/ReplitHomepage.png';
import codesandboxHomepage from '../images/CodesandboxHomepage.png';



export default class Startpage extends Component {
    render() {
        return (
            <div>
                <h1 id="homepageTitle">Forgot where to find the most helpful tools and guides?</h1>
                <h2 id="littlemotivation">Do not worry, we got you covered!</h2>
                <div className="usefulFlex">
                    <a href="http://learn.ironhack.com" target="_blank">
                        <img className="usefulImage" src={ironhackHomepage} alt="Ironhack Homepage" />
                    </a>
                    <div className="homepageDescription">
                        <h3>Welcome to Ironhack!</h3>
                        <p>
                            In order to have the best start into becoming a real developer we prepared a great collection of Tutorials, DIY Exercises and also guided examples.
                            You can access all of them by creating an account on our platform, then you are ready to start!
                    </p>
                    </div>

                </div>
                <div className="usefulFlex">
                    <a href="https://trello.com/" target="_blank">
                        <img className="usefulImage" src={trelloHomepage} alt="Trello Homepage" />
                    </a>
                    <div className="homepageDescription">
                        <h3>Welcome to Trello!</h3>
                        <p>
                            Trello is a web-based Kanban-style list-making application.
                            In other words, it´s the perfect way to help bringing more structure in your projects and to get an overview of the current status.
                            This will come in handy when you are going to start working on your own projects!
                    </p>
                    </div>

                </div>
                <div className="usefulFlex">
                    <a href="https://github.com" target="_blank">
                        <img className="usefulImage" src={githubHomepage} alt="Github Homepage" />
                    </a>
                    <div className="homepageDescription">
                        <h3>Welcome to Github!</h3>
                        <p>
                            GitHub is a Git repository hosting service, but it adds many of its own features.
                            While Git is a command line tool, GitHub provides a Web-based graphical interface.
                            Git is a Distributed Version Control tool that is used to store different versions of a file in a remote or local repository.
                            Summarized, in this bootcamp we will work with Github to manage the source code of our projects.
                            If you never heard of Git or Github it´s totally fine, we will show you how to use it so when you start working with your colleagues on the same project everyone of you will always have the latest and greatest state of the project! :)
                    </p>
                    </div>

                </div>
                <div className="usefulFlex">
                    <a href="https://www.codewars.com" target="_blank">
                        <img className="usefulImage" src={codewarsHomepage} alt="Codewars Homepage" />
                    </a>
                    <div className="homepageDescription">
                        <h3>Welcome to Codewars!</h3>
                        <p>
                            If want to practise or improve your coding skills you should take a look at Codewars.
                            Dozens of developers are creating so called "Katas", in all sorts of programming languages and in all difficulty levels.
                            If you want to compete with your colleagues/friends, you can create your own clan and check who of you has what it takes to be the best developer!
                    </p>
                    </div>

                </div>
                <div className="usefulFlex">
                    <a href="https://kahoot.it/" target="_blank">
                        <img className="usefulImage" src={kahootHomepage} alt="Kahoot Homepage" />
                    </a>
                    <div className="homepageDescription">
                        <h3>Welcome to Kahoot!</h3>
                        <p>
                            Kahoot is a free student-response tool for administering quizzes, facilitating discussions, or collecting survey data.
                            It is a game-based classroom response system played by the whole class in real time.
                            You will see it many times during our bootcamp so stay tuned!
                    </p>
                    </div>

                </div>
                <div className="usefulFlex">
                    <a href="https://codepen.io/" target="_blank">
                        <img className="usefulImage" src={codepenHomepage} alt="Codepen Homepage" />
                    </a>
                    <div className="homepageDescription">
                        <h3>Welcome to Codepen!</h3>
                        <p>
                            CodePen is an online community for testing and showcasing user-created HTML, CSS and JavaScript code snippets.
                            At the beginning of our bootcamp you are going to use it quite a lot before we are going to start developing in VisualStudioCode.
                    </p>
                    </div>

                </div>
                <div className="usefulFlex">
                    <a href="https://repl.it/" target="_blank">
                        <img className="usefulImage" src={replitHomepage} alt="Repl.it Homepage" />
                    </a>
                    <div className="homepageDescription">
                        <h3>Welcome to Repl.it!</h3>
                        <p>
                            REPL stands for Read-Eval-Print-Loop - however, the function of REPLs at Repl.it has outgrown that definition.
                            Capable of doing much more, Repls are the workspaces that Repl.it users interface with whenever they use the app.
                            A Repl at Repl.it is an interactive programming environment.
                            You can create a workspace in any number of languages, where you are given a container on a virtual machine where your code can run, sandboxed.
                            In any given repl, there are two main parts - the editor and the console.
                    </p>
                    </div>

                </div>
                <div className="usefulFlex">
                    <a href="https://codesandbox.io" target="_blank">
                        <img className="usefulImage" src={codesandboxHomepage} alt="Codesandbox Homepage" />
                    </a>
                    <div className="homepageDescription">
                        <h3>Welcome to Codesandbox!</h3>
                        <p>
                            We know how overwhelming JavaScript development can be.
                            With CodeSandbox we specifically focus on web application development to make the experience as smooth as possible.
                            Just open your browser and start coding.
                    </p>
                    </div>
                </div>
            </div>
        )
    }
}