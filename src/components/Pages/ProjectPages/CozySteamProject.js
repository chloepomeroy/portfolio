import { Grid, Typography, Button, Stack } from "@mui/material";
import React, { useRef, useEffect } from "react";
import PageTitle from "../../Titles";
import { Link } from "react-router-dom";

export default function CozySteamProject() {
    var redditPost = <Link className="nice-link" to="https://www.reddit.com/r/CozyGamers/comments/16mbobs/name_your_favorite_cozy_game_trying_to_make_a/">Reddit Post</Link>
    var link2023 = <Link className="nice-link" to="https://www.siliconera.com/here-is-the-wholesome-direct-2023-game-roundup/">2023</Link>
    var link2022 = <Link className="nice-link" to="https://www.siliconera.com/here-is-the-wholesome-direct-2022-games-list-recap/">2022</Link>
    var redditPost2 = <Link className="nice-link" to="https://www.reddit.com/r/gamedev/comments/165cii0/this_year_we_gathered_data_about_65000_games_in/">Reddit Post</Link>

    return (
        <Grid container spacing={2} padding={2} sx={{ justifyContent: "center" }} id="projects">
            <Grid item xs={10} style={{ textAlign: "left" }}>
                <PageTitle pageTitle="Classifying Cozy Steam Games using Binary Prediction" />
                <Grid item xs={10} marginBottom={2} style={{ textAlign: "left" }}>
                    {/* <Button variant="outlined" href="https://canada.governmentdatachallenge.com/about/">Github Repo</Button> */}
                    <Typography variant="h5" color={"#808080"}>
                        In Progress
                    </Typography>
                </Grid>
            </Grid>

            <Grid container spacing={2} padding={2} style={{ justifyContent: "center", textAlign: "left" }} marginBottom={5}>
                <Grid item xs={10}>
                    <Typography variant="h6" color={"#b8a3d4"} marginBottom={1}>
                        Overview
                    </Typography>
                    <Typography marginBottom={2}>
                        The idea for this project is to create a binary classification model that will determine if a game is considered 'Cozy' or 'Not Cozy'.
                        The inspiation for this is that I have a Youtube channel where I talk about cozy games and I noticed that it was difficult for me to
                        find smaller indie cozy games myself unless they heavily marketed themselves that way and were included in Games industry articles
                        labelling them that way. I thought creating this model might be a nice way for me to find lesser known games that still fit the cozy
                        vibe. In the longer term I intend to build a model that assigns each game a 'Coziness rating' rather than a simple binary classification.
                    </Typography>

                    <Typography variant="h6" color={"#b8a3d4"}>
                        Challenges
                    </Typography>
                    <Typography marginBottom={2}>
                        <ul>
                            <li>How can I determine a game to be 'Cozy'?</li>
                            <li>Coziness is subjective. I tried to use a variety of sources to formulate my definition for the 'cozy' category, but ultimately this model
                                will be biased.</li>
                            <li>It's almost impossible to definitively say a game is 'Not Cozy'</li>
                            <li>There is a HUGE class imbalance, where cozy games make up less than 1% of the dataset</li>
                        </ul>
                    </Typography>

                    <Typography variant="h6" color={"#b8a3d4"} marginBottom={1}>
                        Determining Coziness
                    </Typography>
                    <Typography marginBottom={2}>
                        In order to avoid my own bias as much as possible, I wanted to find what the general gaming community would consider to be 'cozy games'. I
                        looked at the lists of games presented at Wholesome Direct, an indie showcase of upcoming wholesome games that is pretty popular in cozy
                        gaming circles, for {link2022} and {link2023}. I also used the games listed on this {redditPost}. This landed me with ~300 games to be labelled as cozy.
                    </Typography>

                    <Typography variant="h6" color={"#b8a3d4"} marginBottom={1}>
                        Building the Dataset
                    </Typography>

                    <Typography marginBottom={2}>
                        Steam has an API that I've used before to get game-related data, but to get a games Tags you need to perform an API call with that specific game's ID.
                        This makes it pretty difficult to get this data for every game on Steam, but luckily I found this {redditPost2} with data of every (released) Steam Game
                        as of 2023, including tags. Since this dataset was created by an indie game dev to analyze trends, this dataset also includes small games (even those with
                        no reviews), which other datasets sometimes omit. Using this data, and my previously determined list of cozy games, I ended up with a dataset with only
                        around 0.4% of items in the 'cozy' class.
                    </Typography>

                    <Typography variant="h6" color={"#b8a3d4"} marginBottom={1}>
                        Data Prep & Feature Engineering
                    </Typography>

                    <Typography marginBottom={2}>
                        In the initial dataset, the tags are listed as one long string with commas separating different tags. I created binary columns for each unique tag using one
                        hot encoding, omitting tags that were used by less than 50 games.
                    </Typography>

                    <Typography marginBottom={2}>
                        I believe that price could be a factor in determining cozy games, since they don't typically have the same pricepoint that a serious triple A game might have.
                        I decided to bin the Price column into 4 binary columns: Less than $5, $5-20, $20-35, $35-50, More than $50. I also removed games with prices larger than $200
                        because I observed that these games were all either special editions of games that already existed in the dataset for a lower price, corporate training simulators,
                        or not actual games (game pages with no description, cover art, etc.).
                    </Typography>

                    <Typography variant="h6" color={"#b8a3d4"} marginBottom={1}>
                        Building the Model
                    </Typography>
                    <Typography marginBottom={2}>
                        I trained this model using binary logistic regression with misclassification weights of 1 for the 0 (non cozy) class and 200 for the 1 (cozy) class, to address the
                        major class imbalance. I've just performed preliminary tests but the results are promising.
                    </Typography>
                    <Typography variant="h6" color={"#b8a3d4"} marginBottom={1}>
                        Preliminary Results
                    </Typography>
                    <Typography marginBottom={2}>
                        Currently, the model misses some games that should be classified as cozy, but interestingly, due to the weights I added, the model predicts many games as cozy that
                        weren't in the cozy class in the training set. Inspecting these games manually, I can see that a lot of them are in fact games I would consider to be cozy, so the
                        model is already helping me find lesser known cozy games!
                    </Typography>
                    <Typography>
                        <Typography variant="h6" color={"#b8a3d4"}>
                            Next Steps
                        </Typography>
                        <Typography marginBottom={10}>
                            <ul>
                                <li>Hyperparameter Tuning of the Logistic Regression Model</li>
                                <li>Testing other types of model for binary classification and comparing them</li>
                            </ul>
                        </Typography>
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}