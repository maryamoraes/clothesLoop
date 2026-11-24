import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Tela from '@/components/Tela';
import { Cores } from '@/constants/cores';
import { useState } from 'react';
import * as Location from 'expo-location';

const BRECHOS = [
    { nome: 'Use & Reuse', endereco: 'Rua Alameda, 1234' },
    { nome: 'Brechó de Garagem NH', endereco: 'Rua Cinco de Abril, 233' },
    { nome: 'Brechó Santamaria', endereco: 'Rua Joaquim Nabuco, 13' },
    { nome: 'Garimpando', endereco: 'Rua Rio Branco, 321' },
];

export default function Pontos() {
    const [localizacao, setLocalizacao] = useState('');

    async function minhaLocalizacao() {
        setLocalizacao('Buscando localização...');

        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setLocalizacao('Permissão de localização negada');
            return;
        }

        try {
            const pos = await Location.getCurrentPositionAsync({});
            const lat = pos.coords.latitude.toFixed(5);
            const lng = pos.coords.longitude.toFixed(5);
            setLocalizacao(`Latitude: ${lat} | Longitude: ${lng}`);
        } catch {
            setLocalizacao('Não foi possível obter a localização');
        }
    }
    return (
        <Tela>
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.titulo}>
                    <View style={styles.circulo}>
                        <Text style={styles.circuloIcone}>📍</Text>
                    </View>
                    <View style={styles.tituloTextos}>
                        <Text style={styles.tituloPrincipal}>Pontos de Coleta</Text>
                        <Text style={styles.subtitulo}>Encontre o ponto mais perto de você!</Text>
                    </View>
                    <Pressable style={styles.botaoLocal} onPress={minhaLocalizacao}>
                        <Text style={styles.botaoLocalTexto}>Minha localização</Text>
                    </Pressable>
                </View>

                {localizacao ? (
                    <Text style={{ textAlign: 'center', fontSize: 12, marginBottom: 14 }}>
                        📍 {localizacao}
                    </Text>
                ) : null}

                <View style={styles.lista}>
                    {BRECHOS.map((b) => (
                        <View key={b.nome} style={styles.item}>
                            <Text style={styles.itemIcone}>👚</Text>
                            <View style={styles.itemTextos}>
                                <Text style={styles.itemNome}>{b.nome}</Text>
                                <Text style={styles.itemEndereco}>📍 {b.endereco}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </Tela>
    );
}

const styles = StyleSheet.create({
    scroll: { padding: 16 },
    titulo: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    circulo: {
        width: 56,
        height: 56,
        borderRadius: 28,
        borderWidth: 3,
        borderColor: Cores.vinho,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circuloIcone: { fontSize: 24 },
    tituloTextos: { flex: 1, marginLeft: 12 },
    tituloPrincipal: { fontSize: 18 },
    subtitulo: { fontSize: 11, marginTop: 2 },
    botaoLocal: {
        backgroundColor: Cores.vinho,
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 6,
    },
    botaoLocalTexto: { color: Cores.branco, fontSize: 11 },
    lista: { gap: 14 },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Cores.branco,
        borderRadius: 10,
        padding: 12,
    },
    itemIcone: { fontSize: 32 },
    itemTextos: { marginLeft: 12, flex: 1 },
    itemNome: { fontSize: 16 },
    itemEndereco: { fontSize: 11, marginTop: 4 },
});