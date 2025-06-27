import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../styles/HomeScreenStyles';
import SatisfactionMeter from '../components/cards/SatisfactionMeter';
import AnimalCountsCard from '../components/cards/AnimalCountsCard';
import useHelp from '../hooks/useHelp';
import HelpModal from '../components/modals/HelpModal';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSpace } from '../context/SpaceContext';
import { useWellbeing } from '../hooks/useWellbeing';

export default function HomeScreen() {
  const { selectedSpace } = useSpace();
  const navigation = useNavigation();

  const spaceId = selectedSpace?.id || selectedSpace?._id;
  const { wellbeing, loading } = useWellbeing(spaceId);

  const {
    visible,
    currentText,
    isLast,
    onNext,
    onSkip,
    triggerManually
  } = useHelp('Home');

  if (!selectedSpace) {
    return (
      <View style={styles.container}>
        <Text style={styles.noSpaceText}>Selecciona un espacio para ver los datos.</Text>
      </View>
    );
  }

  const wdata = wellbeing?.data || {};

  const temperature = typeof wdata.temperature === 'number' ? wdata.temperature : '--';
  const humidity = typeof wdata.humidity === 'number' ? wdata.humidity : '--';
  const pollution = typeof wdata.pollution === 'number' ? wdata.pollution : '--';
  const satisfactionValue = typeof wdata.wellbeingScore === 'number' ? wdata.wellbeingScore : '--';

  const animals = selectedSpace.animals || [];
  const galloCount = animals.find(a => a.species === 'Gallo')?.breeds.reduce((sum, b) => sum + (Number(b.quantity) || 0), 0) || 0;
  const gallinaCount = animals.find(a => a.species === 'Gallina')?.breeds.reduce((sum, b) => sum + (Number(b.quantity) || 0), 0) || 0;
  const pollitoCount = animals.find(a => a.species === 'Pollito')?.breeds.reduce((sum, b) => sum + (Number(b.quantity) || 0), 0) || 0;

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={triggerManually} style={styles.helpButton}>
        <Ionicons name="help-circle-outline" style={styles.helpIcon} />
      </TouchableOpacity>
      <View style={{...styles.cardLarge, marginTop: 15}}>
        <Text style={styles.cardTitle}>Temperatura</Text>
        <View style={styles.cardContent}>
          <Text style={styles.cardValue}>{loading ? '--' : temperature + '°C'}</Text>
          <Image source={require('../assets/img/temp-icon.svg')} style={styles.cardIcon} />
        </View>
      </View>
      <View style={styles.row}>
        <View style={{ ...styles.cardSmall, marginRight: 20 }}>
          <Text style={styles.cardTitle}>Humedad</Text>
          <View style={styles.cardContent}>
            <Text style={styles.cardValue}>{loading ? '--' : humidity + '%'}</Text>
            <Image source={require('../assets/img/humidity-icon.png')} style={styles.cardIcon} />
          </View>
        </View>
        <View style={styles.cardSmall}>
          <Text style={styles.cardTitle}>Contaminación</Text>
          <View style={styles.cardContent}>
            <Text style={styles.cardValue}>{loading ? '--' : pollution + ' ppm'}</Text>
            <Image source={require('../assets/img/pollution-icon.png')} style={styles.cardIcon} />
          </View>
        </View>
      </View>
      <AnimalCountsCard
        galloCount={galloCount}
        gallinaCount={gallinaCount}
        pollitoCount={pollitoCount}
        openScreen={() => navigation.navigate('GestionAnimales')}
      />
      <View style={styles.satisfactionContainer}>
        <Text style={styles.sectionTitle}>Bienestar</Text>
        <SatisfactionMeter value={satisfactionValue} />
      </View>
      <HelpModal
        visible={visible}
        text={currentText}
        isLast={isLast}
        onNext={onNext}
        onSkip={onSkip}
      />
    </ScrollView>
  );
}
