import React, { useState } from 'react';
import {View, Image, Text} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {RectButton} from 'react-native-gesture-handler';

import styles from './styles';
import api from '../../services/api';

import landingImg from '../../assets/images/landing.png';
import {Feather} from '@expo/vector-icons';

function Landing() {
    const [totalConnections, setTotalConnections] = useState(0);
    const {navigate} = useNavigation();

    useFocusEffect(() => {
        api.get('connections').then(response => {
            const {total} = response.data;
            setTotalConnections(total);
        })
    });

    function handleNavigateToGiveClassesPage() {
        navigate('GiveClasses')
    }

    function handleNavitageToStudyPages() {
        navigate('study')
    }

    return (
        <View style={styles.container}>
            <Image style={styles.banner} source={landingImg}/>

            <Text style={styles.title}>
                Seja bem-vindo, {'\n'}
                <Text style={styles.titleBold}>O que deseja fazer?</Text>
            </Text>

            <View style={styles.buttonsContainer}>
                <RectButton 
                onPress={handleNavitageToStudyPages}
                    style={[styles.button, styles.buttonPrimary]}
                    >
                    <Feather name="book-open" size={50} color="#fff"/>
                    <Text style={styles.buttonText}>Estudar</Text>
                </RectButton>

                <RectButton  
                    onPress={handleNavigateToGiveClassesPage}
                    style={[styles.button, styles.buttonSecundary]}
                >
                    <Feather name="monitor" size={50} color="#fff"/>
                    <Text style={styles.buttonText}>Dar Aulas</Text>
                </RectButton>
            </View>

            <Text style={styles.totalConnections}>
                Total de {totalConnections} conexões já realizadas {' '}
                <Feather name="heart" size={15} color="#fff"/>
            </Text>
        </View>
    );
}

export default Landing;