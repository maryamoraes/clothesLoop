import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import Tela from '@/components/Tela';
import { Cores } from '@/constants/cores';
import { MENU } from '@/constants/menu';

export default function Home() {
  const router = useRouter();

  return (
    <Tela fundo={Cores.branco}>
      <Text style={styles.titulo}>Bem vindo !</Text>
      <Text style={styles.subtitulo}>principais funções</Text>

      <View style={styles.grid}>
        {MENU.map((item) => (
          <Pressable
            key={item.nome}
            style={styles.card}
            onPress={() => {
              if (item.rota) router.push(item.rota);
            }}
          >
            <Text style={styles.cardIcone}>{item.icone}</Text>
            <Text style={styles.cardTexto}>{item.nome}</Text>
          </Pressable>
        ))}
      </View>
    </Tela>
  );
}

const styles = StyleSheet.create({
  titulo: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginTop: 12 },
  subtitulo: { fontSize: 16, textAlign: 'center', marginTop: 8 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    rowGap: 40,
    marginTop: 30,
    paddingHorizontal: 20,
  },
  card: {
    width: 130,
    height: 135,
    borderRadius: 20,
    backgroundColor: Cores.vinho,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIcone: { fontSize: 44 },
  cardTexto: { color: Cores.branco, marginTop: 8, fontWeight: '600' },
});