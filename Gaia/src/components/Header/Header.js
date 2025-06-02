import React, { useState, useRef, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, Easing, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(animation, {
      toValue: menuAberto ? 1 : 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [menuAberto]);

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 334],
  });

  const opacityInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  function toggleMenu() {
    setMenuAberto(!menuAberto);
  }

  function navegarPara(tela) {
    setMenuAberto(false);
    navigation.navigate(tela);
  }

  return (
    <>
      <View style={styles.header}>
        <Image 
            source={require('../../../assets/G.png')} 
            style={{ width: 130, height: 120 }} 
        />

        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <MaterialIcons name="menu" size={32} color="#CBE3BF" />
        </TouchableOpacity>
      </View>

      <Animated.View
        style={[
          styles.menuDropdown,
          { height: heightInterpolate, opacity: opacityInterpolate },
        ]}
      >
        {[
          { label: 'Home', route: 'TelaInicial' },
          { label: 'Locais', route: 'Locais' },
          { label: 'Doar', route: 'Doar' },
          { label: 'Doações', route: 'Doacoes' },
          { label: 'Ajuda', route: 'Ajuda' },
          { label: 'Perfil', route: 'Perfil' },
        ].map((item, index) => (
          <View key={item.route}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navegarPara(item.route)}
            >
              <Text style={styles.menuText}>{item.label}</Text>
            </TouchableOpacity>
            {index < 7 && <View style={styles.separator} />}
          </View>
        ))}
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 130,
    backgroundColor: '#1F1F1F',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 30,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  titulo: {
    color: '#CBE3BF',
    fontWeight: 'bold',
    fontSize: 24,
  },
  menuButton: {
    padding: 10,
  },
  menuDropdown: {
    position: 'absolute',
    top: 130,
    right: 0,
    backgroundColor: '#1F1F1F',
    paddingVertical: 5,
    paddingHorizontal: 15,
    zIndex: 999,
    width: 180,
    overflow: 'hidden',
  },
  menuItem: {
    paddingVertical: 10,
  },
  menuText: {
    color: '#CBE3BF',
    fontSize: 18,
  },
  separator: {
    height: 1,
    backgroundColor: '#56A829',
    marginVertical: 4,
  },
});
