import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Cores } from '@/constants/cores';

export default function Header() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.titulo}>ClothesLoop</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Cores.vinho,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
    paddingHorizontal: 12,
  },
  logo: { width: 70, height: 70, resizeMode: 'contain' },
  titulo: {
    flex: 1,
    textAlign: 'center',
    fontSize: 34,
    color: '#000',
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
  },
});