import { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles/components/cards/AnimalCardStyles';

export default function AnimalCard({
  icon,
  count,
  breeds,
  totalBreeds,
  isExpanded,
  onToggle,
  onUpdateBreed,
  onDeleteBreed
}) {
  const [editIndex, setEditIndex] = useState(null);
  const [editCount, setEditCount] = useState(0);

  const handleEdit = (i) => {
    setEditIndex(i);
    setEditCount(breeds[i].count);
  };

  const handleSave = (i) => {
    if (onUpdateBreed) onUpdateBreed(
      breeds[i].name, editCount, breeds[i].animalId, breeds[i].species
    );
    setEditIndex(null);
  };

  const handleDelete = (i) => {
    if (onDeleteBreed) onDeleteBreed(breeds[i].name, breeds[i].animalId);
    setEditIndex(null);
  };

  const handleIncrement = () => setEditCount((c) => c + 1);
  const handleDecrement = () => setEditCount((c) => (c > 0 ? c - 1 : 0));

  return (
    <View style={styles.cardContainer}>
      <View style={styles.topRow}>
        <Image source={icon} style={styles.icon} />
        <Text style={styles.count}>{count}</Text>
        <View style={styles.rightRow}>
          <Text style={styles.totalBreedCount}>{totalBreeds} Especies</Text>
          <TouchableOpacity onPress={onToggle}>
            <Ionicons
              name={isExpanded ? "chevron-up-outline" : "chevron-down-outline"}
              style={styles.dropdownIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      {isExpanded && breeds && (
        <View style={styles.breedList}>
          {breeds.map((b, i) => (
            <View key={i} style={styles.breedRow}>
              <Text style={styles.breedName}>{b.name}</Text>
              <View style={styles.editContainer}>
                {editIndex === i ? (
                  <View style={styles.counterContainer}>
                    <View style={styles.topContainer}>
                      <TouchableOpacity onPress={handleDecrement}>
                        <Ionicons name="remove" style={styles.counterIcons} />
                      </TouchableOpacity>
                      <Text style={styles.breedCount}>{editCount}</Text>
                      <TouchableOpacity onPress={handleIncrement}>
                        <Ionicons name="add" style={styles.counterIcons} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.downContainer}>
                      <TouchableOpacity onPress={() => handleDelete(i)}>
                        <Ionicons name="trash-outline" style={styles.deleteIcon} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleSave(i)}>
                        <Ionicons name="checkmark" style={styles.saveIcon} />
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <>
                    <Text style={styles.breedCount}>{b.count}</Text>
                    <TouchableOpacity onPress={() => handleEdit(i)}>
                      <Ionicons name="create-outline" style={styles.editIcon} />
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}