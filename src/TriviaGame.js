import {React, Component} from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Grid,
  GridItem,
  theme,
  Button,
  SimpleGrid,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import questionList from './json/triviaCode.json'

class TriviaGame extends Component{

    state = {
        gameStart: false,
        gameOver: false,
        playerScore: 0,
        questionNum: 0,
        totalQuestions: 0,
        question: "",
        answer: "",
        a1: "",
        a2: "",
        a3: "",
        a4: ""
    }

    loadNewQuestion = () => 
    {
        this.setState({
            question: questionList[this.state.questionNum].question,
            a1: questionList[this.state.questionNum].a1,
            a2: questionList[this.state.questionNum].a2,
            a3: questionList[this.state.questionNum].a3,
            a4: questionList[this.state.questionNum].a4,
            answer: questionList[this.state.questionNum].answer,
            totalQuestions: questionList.length,
            questionNum: this.state.questionNum + 1
        })
    }

    choiceButton = (choice, cID) =>
    {
      return <Button ml='2vw' mr='2vw' colorScheme='pink' variant='solid' onClick = {this.checkAnswer} data_id = {cID} >{choice}</Button>
    }

    renderChoices = () =>
    {
        return(
            <SimpleGrid columns={[1, null, 2]} width='100vw' spacing={10} p = {4}>
              {this.choiceButton(this.state.a1, "1")}
              {this.choiceButton(this.state.a2, "2")}
              {this.choiceButton(this.state.a3, "3")}
              {this.choiceButton(this.state.a4, "4")}
            </SimpleGrid>
          )
    }

    renderQuestion = () =>
    {
        return(
            <Box p={4} height='15vh'>
              <Text fontSize='4vmin'  >
                {this.state.question}
              </Text>
            </Box>
          )
    }



    startGame = e => 
    {
        this.setState({
            gameStart : true
        })
        this.loadNewQuestion()
    }

    gameOver = () =>
    {
        return(
            <Text fontSize = '4vmin'>
                Congrats on finishing! You've gotten {this.state.playerScore/this.state.totalQuestions*100}% or {this.state.playerScore}/{this.state.totalQuestions} questions correct.
            </Text>
        )
    }

    resetGame = () => {
        this.setState({
            gameStart: false,
            gameOver: false,
            playerScore: 0,
            questionNum: 0,
            totalQuestions: 0,
            question: "",
            answer: "",
            a1: "",
            a2: "",
            a3: "",
            a4: ""
        })
    }

    checkAnswer = e =>
    {
        let qID = e.target.getAttribute('data_id');
        if(qID === this.state.answer)
        {
            this.setState({
                playerScore: this.state.playerScore + 1
            })
        }
        else
        {
            this.setState({}) // blank code to update state even if the answer is wrong. Will probably refactor in the future
        }

        if(this.state.questionNum < this.state.totalQuestions)
        {
            this.loadNewQuestion();
        }
        else
        {
            this.setState({gameOver: true});
            this.gameOver();
        }

    }

    render() {
        return (
          <ChakraProvider theme={theme}>
            <Grid templateColumns='repeat(2, 1fr)' gap={6} p={3} minH ='25vh'>
              <GridItem> 
                <Link fontSize ='12px' href='https://github.com/Izuria/' isExternal>Check out my GitHub!</Link>
              </GridItem>
              <GridItem colStart={3}> 
                <ColorModeSwitcher justifySelf="flex-end" />
              </GridItem>
            </Grid>
  
            <Box textAlign="center" >              
                { !this.state.gameStart && !this.state.gameOver && 
                  <VStack>
                    <Text fontSize='36px'>
                      Totally Random Trivia Game!
                    </Text>
                    <Text fontSize='md'>
                      Test out your skills with a bunch of totally random trivia questions.
                    </Text>
                    <Button colorScheme='teal' variant='solid' onClick = {this.startGame}>Start the quiz!</Button>
                  </VStack>
                }
                
                { this.state.gameStart && !this.state.gameOver && 
                  this.renderQuestion()
                }
  
                { this.state.gameOver &&
                  this.gameOver()
                }
  
                <VStack spacing={8}>
  
                <Box mt='5vh'>
                { this.state.gameStart && !this.state.gameOver && 
                  this.renderChoices()
                }
  
                { this.state.gameOver &&
                  <Button colorScheme='teal' variant='solid' onClick = {this.resetGame}>Click Here to Reset!</Button>
                }
                </Box>
                     
  
                </VStack>
  
            </Box>
          </ChakraProvider>
        );
      }

}

export default TriviaGame;