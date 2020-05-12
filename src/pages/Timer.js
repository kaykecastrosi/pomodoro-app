import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import bannerImg from '../assets/banner.png'
import  { AnimatedCircularProgress } from 'react-native-circular-progress'

function formatSeconds(seconds) {
    if(seconds < 60) {
        return `${seconds} seg`
    }

    return `${Math.floor(seconds / 60)} min`
}

let timer

const Timer = () => {
    const [timerEnabled, setTimerEnabled] = useState(false)
    const [secondsEllapsed, setSecondsEllapsed] = useState(0)
    function toggleTimer() {
        if(timerEnabled){
            clearInterval(timer)

            setTimerEnabled(false)
        } else {
            timer = setInterval(function(){
                setSecondsEllapsed(state => state + 1)
            }, 1000);

            setTimerEnabled(true)
        }
    }    
    return ( 
       <LinearGradient
          colors={['#E7F3FE', '#9ABEE0']}
          style={styles.container}
        >
        <Text style={styles.title}>Pomodora</Text>

        <AnimatedCircularProgress
            size={300}
            width={12}
            fill={(secondsEllapsed * 100) / 600}
            tintColor="#75A1DE"
            backgroundColor="#fff"
            rotation={0}>
            { () => (
                <Text style={styles.progress}>{formatSeconds(secondsEllapsed)}</Text>
            ) }
        </AnimatedCircularProgress>

        <TouchableOpacity style={styles.button} onPress={toggleTimer} >
            <MaterialIcons name={timerEnabled ? "pause" : "play-arrow"} size={32} color="#fff" />
        </TouchableOpacity>
        </LinearGradient>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 28,
        color: "#1C354F",
        fontWeight: 'bold',
        textAlign: "center",
        maxWidth: 300,
        marginVertical: 80,
        marginBottom: 80,
    },
    button: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: '#2E5B9A',
        justifyContent: "center",
        alignItems: "center",
        marginTop: 80
    },
    progress: {
        fontSize: 60,
        color: "#1C354F",
        fontWeight: 'bold',
        textAlign: "center",
    }
})

export default  Timer;