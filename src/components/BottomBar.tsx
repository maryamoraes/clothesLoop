import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Cores } from '@/constants/cores';
import { MENU } from '@/constants/menu';

export default function BottomBar() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.barra, { paddingBottom: insets.bottom + 8 }]}>
      {MENU.map((item) => (
        <Pressable
          key={item.nome}
          style={styles.item}
          onPress={() => {
            if (item.rota) router.push(item.rota);
          }}
        >
          <Text style={styles.icone}>{item.icone}</Text>
          <Text style={styles.label}>{item.nome}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  barra: {
    backgroundColor: Cores.vinho,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
  },
  item: { alignItems: 'center' },
  icone: { fontSize: 28 },
  label: { fontSize: 10, color: '#000', marginTop: 2 },
});