import { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import Tela from '@/components/Tela';
import { Cores } from '@/constants/cores';

type Produto = {
  id: string;
  descricao: string;
  preco: number;
  pontos: number;
  imagem?: string;
};

export default function Catalogo() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function carregar() {
      try {
        const snap = await getDocs(collection(db, 'produtos'));
        const lista = snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<Produto, 'id'>),
        }));
        setProdutos(lista);
      } catch {
        setErro('Não foi possível carregar os produtos');
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  return (
    <Tela>
      {carregando ? (
        <Text style={styles.aviso}>Carregando...</Text>
      ) : erro ? (
        <Text style={styles.aviso}>{erro}</Text>
      ) : produtos.length === 0 ? (
        <Text style={styles.aviso}>Nenhum produto cadastrado ainda</Text>
      ) : (
        <FlatList
          data={produtos}
          keyExtractor={(p) => p.id}
          numColumns={2}
          columnWrapperStyle={styles.coluna}
          contentContainerStyle={styles.lista}
          renderItem={({ item }) => (
            <View style={styles.item}>
              {item.imagem ? (
                <Image source={{ uri: item.imagem }} style={styles.imagem} />
              ) : (
                <View style={[styles.imagem, styles.semImagem]} />
              )}
              <Text style={styles.descricao}>{item.descricao}</Text>
              <Text style={styles.preco}>
                R$ {Number(item.preco).toFixed(2).replace('.', ',')}
              </Text>
              <Text style={styles.pontos}>+{item.pontos} pontos</Text>
            </View>
          )}
        />
      )}
    </Tela>
  );
}

const styles = StyleSheet.create({
  aviso: { textAlign: 'center', marginTop: 30, fontSize: 14 },
  lista: { padding: 16, gap: 20 },
  coluna: { justifyContent: 'flex-start' },
  item: { width: '50%', alignItems: 'center', paddingHorizontal: 8 },
  imagem: { width: 150, height: 150, resizeMode: 'cover' },
  semImagem: { backgroundColor: Cores.cinza },
  descricao: { fontSize: 14, marginTop: 6 },
  preco: { fontSize: 14, fontWeight: 'bold', marginTop: 2 },
  pontos: { fontSize: 14, marginTop: 2 },
});