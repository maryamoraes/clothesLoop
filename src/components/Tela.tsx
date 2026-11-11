import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import BottomBar from './BottomBar';
import Header from './Header';
import { Cores } from '@/constants/cores';

type Props = { children: ReactNode; fundo?: string };

export default function Tela({ children, fundo = Cores.rosa }: Props) {
  return (
    <View style={[styles.container, { backgroundColor: fundo }]}>
      <Header />
      <View style={styles.conteudo}>{children}</View>
      <BottomBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  conteudo: { flex: 1 },
});