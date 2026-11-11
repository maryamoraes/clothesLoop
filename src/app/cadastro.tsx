import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import Tela from '@/components/Tela';
import { Cores } from '@/constants/cores';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

type CampoProps = {
    rotulo: string;
    valor: string;
    onChange: (texto: string) => void;
    teclado?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
};

function Campo({ rotulo, valor, onChange, teclado = 'default' }: CampoProps) {
    return (
        <View style={styles.campo}>
            <Text style={styles.rotulo}>{rotulo}:</Text>
            <TextInput
                style={styles.input}
                value={valor}
                onChangeText={onChange}
                keyboardType={teclado}
            />
        </View>
    );
}

export default function Cadastro() {
    const router = useRouter();

    const [form, setForm] = useState({
        cnpj: '',
        razaoSocial: '',
        nomeFantasia: '',
        email: '',
        telefone: '',
        instagram: '',
        cep: '',
        bairro: '',
        rua: '',
        complemento: '',
    });

    const [msgCep, setMsgCep] = useState('');
    const [msgSalvar, setMsgSalvar] = useState('');
    function atualizar(campo: keyof typeof form, valor: string) {
        setForm((anterior) => ({ ...anterior, [campo]: valor }));
    }

    async function buscarCep(texto: string) {
        const cep = texto.replace(/\D/g, '');
        atualizar('cep', cep);
        setMsgCep('');

        if (cep.length !== 8) return;

        try {
            const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const dados = await resposta.json();

            if (dados.erro) {
                setMsgCep('CEP não encontrado');
                return;
            }

            setForm((anterior) => ({
                ...anterior,
                cep,
                rua: dados.logradouro,
                bairro: dados.bairro,
            }));
        } catch {
            setMsgCep('Não foi possível buscar o CEP');
        }
    }

    async function salvar() {
        if (!form.cnpj || !form.nomeFantasia) {
            setMsgSalvar('Preencha pelo menos CNPJ e Nome Fantasia');
            return;
        }

        try {
            await addDoc(collection(db, 'lojas'), form);
            setMsgSalvar('Loja salva com sucesso!');
        } catch {
            setMsgSalvar('Erro ao salvar. Tente novamente.');
        }
    }

    return (
        <Tela>
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.titulo}>
                    <View style={styles.circulo}>
                        <Text style={styles.circuloIcone}>🏠</Text>
                    </View>
                    <View style={styles.tituloTextos}>
                        <Text style={styles.tituloPrincipal}>Cadastro da loja</Text>
                        <Text style={styles.caminho}>Loja / Cadastro da loja</Text>
                    </View>
                    <Pressable style={styles.atalho} onPress={() => router.push('/pontos')}>
                        <Text style={styles.atalhoTexto}>📍 Pontos de coleta</Text>
                    </Pressable>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitulo}>Dados</Text>

                    <View style={styles.linha}>
                        <Campo rotulo="CNPJ" valor={form.cnpj} onChange={(t) => atualizar('cnpj', t)} teclado="numeric" />
                        <Campo rotulo="Razão Social" valor={form.razaoSocial} onChange={(t) => atualizar('razaoSocial', t)} />
                    </View>

                    <View style={styles.linha}>
                        <Campo rotulo="Nome Fantasia" valor={form.nomeFantasia} onChange={(t) => atualizar('nomeFantasia', t)} />
                        <Campo rotulo="Email" valor={form.email} onChange={(t) => atualizar('email', t)} teclado="email-address" />
                    </View>

                    <View style={styles.linha}>
                        <Campo rotulo="Telefone" valor={form.telefone} onChange={(t) => atualizar('telefone', t)} teclado="phone-pad" />
                        <Campo rotulo="Instagram" valor={form.instagram} onChange={(t) => atualizar('instagram', t)} />
                    </View>

                    <View style={styles.linha}>
                        <Campo rotulo="CEP" valor={form.cep} onChange={buscarCep} teclado="numeric" />
                        <Campo rotulo="Bairro" valor={form.bairro} onChange={(t) => atualizar('bairro', t)} />
                    </View>

                    {msgCep ? <Text style={styles.erro}>{msgCep}</Text> : null}

                    <View style={styles.linha}>
                        <Campo rotulo="Rua" valor={form.rua} onChange={(t) => atualizar('rua', t)} />
                        <Campo rotulo="Complemento" valor={form.complemento} onChange={(t) => atualizar('complemento', t)} />
                    </View>

                    <View style={styles.botoes}>
                        {msgSalvar ? (
                            <Text style={{ textAlign: 'center', fontSize: 12, marginBottom: 10 }}>{msgSalvar}</Text>
                        ) : null}
                        <Pressable style={styles.botao} onPress={salvar}>
                            <Text style={styles.botaoTexto}>Salvar Alterações</Text>
                        </Pressable>
                        <Pressable
                            style={styles.botao}
                            onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}
                        >
                            <Text style={styles.botaoTexto}>Cancelar</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </Tela>
    );
}

const styles = StyleSheet.create({
    scroll: { padding: 16 },
    titulo: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
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
    caminho: { fontSize: 11, marginTop: 2 },
    atalho: {
        backgroundColor: Cores.vinho,
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 6,
    },
    atalhoTexto: { color: Cores.branco, fontSize: 11 },
    card: { backgroundColor: Cores.branco, borderRadius: 12, padding: 16 },
    cardTitulo: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
    linha: { flexDirection: 'row', gap: 12, marginBottom: 14 },
    campo: { flex: 1 },
    rotulo: { fontSize: 12, marginBottom: 4 },
    input: {
        backgroundColor: Cores.cinza,
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 10,
        fontSize: 14,
    },
    botoes: { flexDirection: 'row', justifyContent: 'center', gap: 16, marginTop: 8 },
    botao: {
        backgroundColor: Cores.vinho,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
    },
    botaoTexto: { color: Cores.branco, fontSize: 12 },

    erro: { color: '#B00020', fontSize: 12, marginBottom: 10 },
});