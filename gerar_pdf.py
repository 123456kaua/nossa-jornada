"""
Nossa Jornada com Deus — Gerador de PDF
Gera um caderno devocional elegante para impressão ou uso digital.
Uso: python3 gerar_pdf.py
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm, cm
from reportlab.lib.colors import HexColor, white, black
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak,
    Table, TableStyle, KeepTogether, HRFlowable
)
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.pdfgen import canvas as pdfcanvas
from reportlab.platypus import BaseDocTemplate, Frame, PageTemplate
from reportlab.lib import colors
import os
from datetime import date, timedelta

# ─── Paleta de cores ──────────────────────────────────────────────────────────
GOLD        = HexColor('#C9A96E')
GOLD_LIGHT  = HexColor('#E8D5B0')
GOLD_DARK   = HexColor('#8B6E42')
GOLD_DEEP   = HexColor('#5C3D28')
CREAM       = HexColor('#FAF7F2')
CREAM_DARK  = HexColor('#F0EBE1')
INK         = HexColor('#2C2018')
INK_MID     = HexColor('#5C4A35')
INK_LIGHT   = HexColor('#9C8870')
MOSS        = HexColor('#4A6741')
SKY         = HexColor('#3B6B8B')
ROSE        = HexColor('#A85C6E')
COMPLETE_BG = HexColor('#F5FBF3')

W, H = A4  # 210 x 297 mm

MARGIN_X = 18 * mm
MARGIN_Y = 20 * mm

# ─── Dados ────────────────────────────────────────────────────────────────────
BLOCOS = [
    (1,  'Fundamentos',         'Criação, identidade, aliança e sabedoria para o lar',  1,   28),
    (2,  'Jornada e Fé',        'Êxodo, Hebreus, João e Salmos de peregrinação',         29,  56),
    (3,  'Habitação e Presença','Tabernáculo, Apocalipse 21, João 14–17',                57,  84),
    (4,  'Profetas e Promessa', 'Isaías, Jeremias, Ezequiel e Paulo',                    85,  112),
    (5,  'Os Evangelhos',       'Marcos, Lucas, João — Jesus e os relacionamentos',      113, 140),
    (6,  'Sabedoria Prática',   'Provérbios, Eclesiastes e Tiago',                       141, 168),
    (7,  'Cartas e Comunidade', 'Paulo completo, Pedro, João',                           169, 196),
    (8,  'Escritos Históricos', 'Samuel, Reis e Crônicas',                               197, 224),
    (9,  'Salmos e Oração',     '150 Salmos em blocos temáticos',                        225, 252),
    (10, 'Chegada',             'Mateus 24–28, Hebreus 11–13, Apocalipse 19–22',         253, 276),
]

START = date(2026, 3, 30)

MESES_PT = {
    1:'jan', 2:'fev', 3:'mar', 4:'abr', 5:'mai', 6:'jun',
    7:'jul', 8:'ago', 9:'set', 10:'out', 11:'nov', 12:'dez'
}

def date_str(day_num: int) -> str:
    d = START + timedelta(days=day_num - 1)
    return f"{d.day} {MESES_PT[d.month]}"

# Os 28 dias completos
DAYS = [
    (1,  'Criação: o início de todas as coisas',
     'Gênesis 1–2; João 1:1–14', 'at',
     'O mundo começou com a Palavra de Deus. João 1 nos mostra que essa Palavra é uma Pessoa — Jesus. Para um casal que começa uma jornada juntos, é significativo começar reconhecendo que tudo que existe — incluindo o amor de vocês — tem origem nEle.',
     'Senhor, assim como Tu falaste o mundo à existência, fala sobre o nosso relacionamento. Que o começo desta jornada juntos seja marcado pelo reconhecimento de que Tu és o autor da nossa história.'),
    (2,  'O jardim: o primeiro lar e a primeira crise',
     'Gênesis 3–4', 'at',
     'A queda não destruiu o amor — mas revelou sua vulnerabilidade. Adão e Eva esconderam-se um do outro e de Deus. Para o casal, a tentação de esconder falhas, vergonhas e medos do cônjuge é uma das mais antigas.',
     'Guarda-nos da tentação de esconder quem somos um do outro. Que o nosso relacionamento seja um lugar seguro para a vulnerabilidade e para a verdade.'),
    (3,  'A aliança com Abraão: fé e promessa',
     'Gênesis 12; 15; 17', 'at',
     'Abraão foi chamado sem mapa — só com promessa. O casamento tem algo dessa estrutura: é uma aliança que exige fé antes da certeza. Deus escolheu Abraão não por sua perfeição, mas por sua disposição de confiar.',
     'Assim como chamaste Abraão a uma jornada de fé, chama-nos também. Que a nossa aliança seja fundada na Tua promessa e não apenas em nossas próprias forças.'),
    (4,  'Isaque e Rebeca: a providência no amor',
     'Gênesis 24', 'at',
     'A história de Isaque e Rebeca é uma das mais detalhadas narrativas de busca de um cônjuge na Bíblia. O servo ora antes de agir; a família busca a vontade de Deus; Rebeca parte com coragem. A providência de Deus não elimina a agência humana — ela a honra.',
     'Obrigado por como nos trouxeste um ao outro. Que nunca deixemos de ver Tua mão nessa história.'),
    (5,  'Jacó: a luta que transforma',
     'Gênesis 28–29; 32', 'at',
     'Jacó lutou com Deus e saiu mancando — mas com um nome novo. Para o casal, os conflitos não precisam ser destruidores: podem ser momentos onde ambos saem com identidades mais verdadeiras.',
     'Nos momentos de luta, não nos deixes sair os mesmos. Usa as dificuldades para nos moldar.'),
    (6,  'José: confiança quando não faz sentido',
     'Gênesis 37; 39–41', 'at',
     'José não entendeu o plano de Deus quando estava no poço, nem na prisão. Mas continuou fiel. Para o casal, haverá temporadas onde a jornada juntos parecerá estagnada ou incompreensível.',
     'Quando nossa jornada juntos passar por "poços", que mantenhamos fé em Ti como o Deus que age mesmo no silêncio.'),
    (7,  'Reconciliação: José e seus irmãos',
     'Gênesis 45; 50:15–21', 'at',
     'A cena de José revelando-se aos irmãos é uma das mais emocionantes da Bíblia. Ele chora. Ele não guarda rancor. Ele vê a mão de Deus mesmo na traição. Para o casal, o perdão genuíno é o modelo de José.',
     'Ensina-nos a perdoar como José — não porque a dor foi pequena, mas porque Tu és maior que ela.'),
    (8,  'Identidade em Cristo: quem somos antes de qualquer papel',
     'Efésios 1–2', 'nt',
     'Paulo começa Efésios não com obrigações, mas com identidade: escolhidos, adotados, redimidos, selados. Para o casal, saber quem cada um é em Cristo antes de ser cônjuge é libertador.',
     'Que eu não busque no meu parceiro aquilo que só Tu podes dar. Que eu entre nesse relacionamento como pessoa completa em Ti.'),
    (9,  'O Sermão da Montanha: o jeito de Jesus de viver junto',
     'Mateus 5–7', 'nt',
     'As bem-aventuranças descrevem um tipo de pessoa que vai contra a lógica do mundo: os mansos, os misericordiosos, os pacificadores. Para um casal, esse é o retrato de como tratar o cônjuge.',
     'Molda-nos de acordo com o Sermão da Montanha. Que as bem-aventuranças sejam marcas reais do nosso relacionamento.'),
    (10, 'Cântico dos Cânticos: o amor celebrado',
     'Cântico dos Cânticos 1–3', 'sal',
     'A Bíblia inclui um livro inteiro sobre amor romântico — não apologeticamente, mas com celebração plena. O amor físico, emocional e espiritual entre o amado e a amada é apresentado como dom de Deus.',
     'Obrigado por ter criado o amor romântico. Que possamos celebrar nosso amor como dádiva Tua, com alegria e sem vergonha.'),
    (11, 'A oração de Paulo pelo casal: amor com conhecimento',
     'Filipenses 1:9–11; Efésios 3:14–21', 'nt',
     'Paulo ora para que o amor "abunde cada vez mais em pleno conhecimento e toda a percepção". Amor sem conhecimento é sentimento. Amor com conhecimento é compromisso que cresce.',
     'Faz com que nosso amor seja profundo em conhecimento mútuo. Que quanto mais nos conhecemos, mais profundo seja o nosso amor.'),
    (12, 'Rute e Noemim: lealdade além do obrigatório',
     'Rute 1–4', 'at',
     '"Onde tu morreres, morrerei eu." Rute tinha uma saída razoável — e escolheu ficar. O amor maduro tem esse contorno: não fica porque é obrigado, mas porque escolhe ficar.',
     'Que o nosso amor seja da qualidade da lealdade de Rute: uma escolha renovada todos os dias.'),
    (13, 'Salmos 8 e 23: Deus como pastor do lar',
     'Salmos 8; 23; 121', 'sal',
     'O Salmo 23 é um retrato de como Deus cuida da vida cotidiana: descanso, restauração, orientação, proteção. Para o casal, Deus quer ser o pastor do lar de vocês.',
     'Sê o pastor do nosso lar. Guia-nos nas decisões difíceis e caminha conosco por todas as etapas desta jornada.'),
    (14, 'A lei do amor: o maior mandamento',
     'Mateus 22:34–40; 1 João 4:7–21', 'nt',
     'Jesus reduz toda a Lei a dois mandamentos: amar a Deus e amar ao próximo. João vai além: quem ama a Deus ama o irmão. Para o casal, o cônjuge é o "próximo" mais próximo.',
     'Que o nosso amor um pelo outro seja fruto do amor que recebemos de Ti.'),
    (15, 'Êxodo: a libertação como ato de amor',
     'Êxodo 1–6; 14', 'at',
     'Deus ouviu o gemido do povo antes de agir — Ele não estava distante, estava presente na dor. A libertação do Egito começa com Deus ouvindo.',
     'Obrigado por seres o Deus que ouve. Que saibamos trazer nossas lutas a Ti, confiando que Tu escutas antes mesmo de agir.'),
    (16, 'A parábola do filho pródigo: graça sem merecimento',
     'Lucas 15', 'nt',
     'O pai da parábola vê o filho de longe e corre — não espera, não condiciona. Essa é a imagem mais clara de como Deus nos recebe. Para um casal, cultivar essa mesma graça é essencial.',
     'Ensina-nos a correr um em direção ao outro após conflitos. Que a graça seja o tom do nosso relacionamento.'),
    (17, 'O Servo Sofredor e o amor sacrificial',
     'Isaías 52–53', 'at',
     'Isaías 53 é uma profecia impressionante — um retrato preciso de Cristo séculos antes de Sua vinda. Mas é também um convite ao tipo de amor que se entrega sem garantia de retorno.',
     'Diante do amor sacrificial que Tu demonstraste, humilha nossos corações para que o serviço mútuo seja nossa resposta natural.'),
    (18, 'A ressurreição: esperança que transforma tudo',
     '1 Coríntios 15; João 20', 'nt',
     'A ressurreição não é apenas evento passado — é força presente. Para um casal, a esperança da ressurreição transforma como encaram o tempo juntos: as dificuldades são provisórias, os conflitos são remediáveis.',
     'Que a esperança da ressurreição nos liberte da ansiedade sobre o futuro do nosso relacionamento.'),
    (19, 'Salmos de lamento: honestidade diante de Deus',
     'Salmos 22; 42; 88', 'sal',
     'Esses salmos são modelos de honestidade radical com Deus. O lamento bíblico reconhece a dor sem negar a presença de Deus. Para o casal, aprender a lamentar juntos é uma forma profunda de intimidade.',
     'Ensina-nos a sermos honestos com Ti e entre nós, especialmente nas dores.'),
    (20, 'A bênção de Aarão e o nome de Deus',
     'Números 6:22–27; João 17', 'at',
     'A bênção sacerdotal foi pronunciada sobre Israel por séculos. Em João 17, Jesus intercede pelos seus com o mesmo cuidado. Para o casal, pronunciar bênçãos sobre o cônjuge é um ato priesterial bonito.',
     'Ensina-nos a abençoar um ao outro com palavras. Que nossa boca seja instrumento de edificação.'),
    (21, 'Cântico dos Cânticos: o reencontro e a espera',
     'Cântico dos Cânticos 4–8', 'sal',
     'A segunda metade do Cântico aprofunda o retrato da intimidade e da espera. A noiva busca o amado com urgência; o amor é descrito como "forte como a morte".',
     'Santifica nossa espera. Que a antecipação que sentimos seja oferecida a Ti como oferta de obediência.'),
    (22, 'Provérbios: a sabedoria no cotidiano',
     'Provérbios 1–4', 'at',
     'Provérbios começa com um pai ensinando o filho sobre a vida prática. A sabedoria aqui não é abstrata — é como falar, como trabalhar, como se relacionar.',
     'Dai-nos sabedoria prática para as decisões que tomamos juntos — sobre dinheiro, tempo, família e prioridades.'),
    (23, 'A mulher virtuosa — e o homem que a celebra',
     'Provérbios 31; Efésios 5:25–33', 'at',
     'Provérbios 31 é também uma carta de admiração de um homem por sua esposa. Efésios 5 complementa: o amor do marido deve ser modelado no amor sacrificial de Cristo.',
     'Que eu aprenda a ver e celebrar as qualidades do meu parceiro como dons de Deus.'),
    (24, 'Eclesiastes: encontrando sentido no efêmero',
     'Eclesiastes 3; 9; 12', 'sal',
     'Qohélet olha para a vida com honestidade brutal: tudo passa, tudo é vaidade — exceto o que é feito com Deus. Para o casal, esse texto liberta: a perfeição não é o objetivo, a presença é.',
     'Ensina-nos a valorizar o presente um do outro. Que não adiantemos tanto o futuro que percamos o presente.'),
    (25, 'O discurso de Jó a Deus: integridade na dor',
     'Jó 1–2; 38–42', 'at',
     'Jó não entendeu suas circunstâncias, mas manteve sua integridade. No final, Deus não explica — Ele se revela. Para o casal, haverá momentos de dor sem explicação.',
     'Quando não entendermos as dificuldades que enfrentaremos como casal, que confiemos no Deus de Jó.'),
    (26, 'O Espírito Santo e os dons para o corpo',
     '1 Coríntios 12; Romanos 12:1–13', 'nt',
     'Paulo fala de um corpo com muitas partes — cada uma diferente, cada uma necessária. Para o casal, reconhecer os dons específicos que Deus deu a cada um é uma forma de honrar a singularidade do cônjuge.',
     'Obrigado pelos dons que Tu deste a cada um de nós diferentemente. Ensina-nos a celebrar nossas diferenças.'),
    (27, 'A oração como respiração do relacionamento',
     'Mateus 6:5–15; Lucas 11:1–13', 'nt',
     'Jesus ensina a orar de forma comunitária: "Pai nosso" — não "Pai meu". A oração em conjunto é uma das práticas mais transformadoras para um casal cristão.',
     'Ensina-nos a orar juntos com facilidade e profundidade. Que a nossa oração em casal seja tão natural quanto a nossa conversa.'),
    (28, 'Colossenses: Cristo em primeiro lugar',
     'Colossenses 1–3', 'nt',
     'Paulo pede que Cristo tenha preeminência em tudo. Em Colossenses 3, ele conecta essa centralidade com as relações domésticas. Para o casal, colocar Cristo primeiro é reorganização de prioridades concreta.',
     'Que Cristo seja o centro do nosso lar de forma prática e visível.'),
]

TIPO_LABEL = {'at': 'Antigo Testamento', 'nt': 'Novo Testamento', 'sal': 'Livros Poéticos'}
TIPO_COLOR = {'at': SKY, 'nt': ROSE, 'sal': MOSS}

# ─── Estilos ──────────────────────────────────────────────────────────────────
def make_styles():
    return {
        'cover_title': ParagraphStyle(
            'cover_title',
            fontName='Times-Italic',
            fontSize=38,
            leading=46,
            textColor=GOLD_LIGHT,
            alignment=TA_CENTER,
            spaceAfter=6,
        ),
        'cover_sub': ParagraphStyle(
            'cover_sub',
            fontName='Helvetica',
            fontSize=10,
            leading=14,
            textColor=HexColor('#C8B89A'),
            alignment=TA_CENTER,
            spaceAfter=4,
            letterSpacing=3,
        ),
        'cover_verse': ParagraphStyle(
            'cover_verse',
            fontName='Times-Italic',
            fontSize=13,
            leading=20,
            textColor=HexColor('#C8B89A'),
            alignment=TA_CENTER,
        ),
        'section_title': ParagraphStyle(
            'section_title',
            fontName='Times-BoldItalic',
            fontSize=22,
            leading=28,
            textColor=INK,
            spaceAfter=4,
            spaceBefore=8,
        ),
        'section_sub': ParagraphStyle(
            'section_sub',
            fontName='Helvetica',
            fontSize=9,
            leading=13,
            textColor=INK_LIGHT,
            spaceAfter=10,
            letterSpacing=1.5,
        ),
        'label': ParagraphStyle(
            'label',
            fontName='Helvetica',
            fontSize=7.5,
            leading=10,
            textColor=GOLD_DARK,
            letterSpacing=1.8,
        ),
        'day_title': ParagraphStyle(
            'day_title',
            fontName='Times-Bold',
            fontSize=12,
            leading=16,
            textColor=INK,
            spaceBefore=4,
        ),
        'day_ref': ParagraphStyle(
            'day_ref',
            fontName='Helvetica-Oblique',
            fontSize=8.5,
            leading=12,
            textColor=GOLD_DARK,
            spaceAfter=6,
        ),
        'reflexao': ParagraphStyle(
            'reflexao',
            fontName='Times-Roman',
            fontSize=10,
            leading=15,
            textColor=INK_MID,
            alignment=TA_JUSTIFY,
            spaceAfter=6,
        ),
        'oracao': ParagraphStyle(
            'oracao',
            fontName='Times-Italic',
            fontSize=9.5,
            leading=14,
            textColor=INK_MID,
            alignment=TA_JUSTIFY,
        ),
        'oracao_label': ParagraphStyle(
            'oracao_label',
            fontName='Helvetica',
            fontSize=7,
            leading=10,
            textColor=GOLD,
            letterSpacing=1.5,
            spaceAfter=2,
        ),
        'notes_label': ParagraphStyle(
            'notes_label',
            fontName='Helvetica',
            fontSize=7.5,
            leading=10,
            textColor=INK_LIGHT,
            letterSpacing=1,
            spaceAfter=3,
        ),
        'intro_body': ParagraphStyle(
            'intro_body',
            fontName='Times-Roman',
            fontSize=11,
            leading=17,
            textColor=INK_MID,
            alignment=TA_JUSTIFY,
            spaceAfter=8,
        ),
        'bloco_num': ParagraphStyle(
            'bloco_num',
            fontName='Times-Italic',
            fontSize=10,
            leading=14,
            textColor=GOLD,
            letterSpacing=2,
        ),
        'bloco_title': ParagraphStyle(
            'bloco_title',
            fontName='Times-Bold',
            fontSize=14,
            leading=18,
            textColor=INK,
            spaceAfter=2,
        ),
        'bloco_sub': ParagraphStyle(
            'bloco_sub',
            fontName='Times-Italic',
            fontSize=10,
            leading=14,
            textColor=INK_LIGHT,
            spaceAfter=3,
        ),
        'bloco_days': ParagraphStyle(
            'bloco_days',
            fontName='Helvetica',
            fontSize=9,
            leading=13,
            textColor=GOLD_DARK,
        ),
        'index_ref': ParagraphStyle(
            'index_ref',
            fontName='Times-Roman',
            fontSize=10,
            leading=15,
            textColor=INK_MID,
        ),
        'finish_title': ParagraphStyle(
            'finish_title',
            fontName='Times-Italic',
            fontSize=28,
            leading=36,
            textColor=INK,
            alignment=TA_CENTER,
            spaceAfter=12,
        ),
        'finish_verse': ParagraphStyle(
            'finish_verse',
            fontName='Times-Italic',
            fontSize=12,
            leading=19,
            textColor=INK_MID,
            alignment=TA_CENTER,
        ),
    }

# ─── Page callbacks ───────────────────────────────────────────────────────────
class NumberedCanvas(pdfcanvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            super().showPage()
        super().save()

    def draw_page_number(self, page_count):
        page = self._pageNumber
        if page <= 2:
            return  # Sem número na capa e página introdutória
        self.saveState()
        self.setFont('Times-Italic', 8)
        self.setFillColor(INK_LIGHT)
        # Ornament + number
        text = f'✦  {page - 2}  ✦'
        self.drawCentredString(W / 2, 12 * mm, text)
        self.restoreState()


def draw_cover_bg(canvas, doc):
    """Fundo escuro para a capa."""
    canvas.saveState()
    # Dark gradient background via rectangles
    canvas.setFillColor(HexColor('#1C1410'))
    canvas.rect(0, 0, W, H, fill=1, stroke=0)
    # Subtle gold overlay at top
    canvas.setFillColor(HexColor('#3C2A1C'))
    canvas.rect(0, H * 0.55, W, H * 0.45, fill=1, stroke=0)
    # Gold thin rule top
    canvas.setStrokeColor(GOLD)
    canvas.setLineWidth(0.5)
    canvas.line(MARGIN_X, H - 22 * mm, W - MARGIN_X, H - 22 * mm)
    canvas.line(MARGIN_X, 22 * mm, W - MARGIN_X, 22 * mm)
    canvas.restoreState()


def draw_page_bg(canvas, doc):
    """Fundo claro para páginas internas."""
    canvas.saveState()
    canvas.setFillColor(CREAM)
    canvas.rect(0, 0, W, H, fill=1, stroke=0)
    # Thin gold top rule
    canvas.setStrokeColor(GOLD_LIGHT)
    canvas.setLineWidth(0.3)
    canvas.line(MARGIN_X, H - 14 * mm, W - MARGIN_X, H - 14 * mm)
    canvas.line(MARGIN_X, 16 * mm, W - MARGIN_X, 16 * mm)
    canvas.restoreState()


# ─── Builders ─────────────────────────────────────────────────────────────────
def build_cover(styles, photo_path=None):
    elements = []
    elements.append(Spacer(1, 55 * mm))

    # Ornament
    orn = Paragraph('<font color="#8B6E42">✦ ✦ ✦</font>', ParagraphStyle(
        'orn', fontName='Helvetica', fontSize=16, alignment=TA_CENTER,
        textColor=GOLD_DARK, spaceAfter=14, letterSpacing=8))
    elements.append(orn)

    elements.append(Paragraph('Nossa Jornada<br/><i>com Deus</i>', styles['cover_title']))
    elements.append(Spacer(1, 6 * mm))

    elements.append(Paragraph('PLANO DEVOCIONAL PARA DOIS', styles['cover_sub']))
    elements.append(Spacer(1, 3 * mm))

    # Date row
    date_style = ParagraphStyle('date_s', fontName='Helvetica', fontSize=10,
                                alignment=TA_CENTER, textColor=HexColor('#B09070'),
                                spaceAfter=14)
    elements.append(Paragraph('30 março 2026  →  31 dezembro 2026  ·  276 dias', date_style))

    elements.append(Spacer(1, 16 * mm))
    elements.append(Paragraph(
        '"E se alguém puder vencer um só, dois resistirão contra ele;<br/>o cordão de três dobras não se rompe facilmente."',
        styles['cover_verse']))
    elements.append(Spacer(1, 4 * mm))
    ref_style = ParagraphStyle('ref_s', fontName='Helvetica', fontSize=8,
                               alignment=TA_CENTER, textColor=HexColor('#7A6050'),
                               letterSpacing=2)
    elements.append(Paragraph('ECLESIASTES 4:12', ref_style))

    elements.append(PageBreak())
    return elements


def build_intro(styles):
    elements = []
    elements.append(Spacer(1, 8 * mm))
    elements.append(Paragraph('Como usar este plano', styles['section_title']))
    elements.append(HRFlowable(width='100%', thickness=0.5, color=GOLD_LIGHT, spaceAfter=8))

    intro_text = [
        'Este caderno devocional foi criado para ser percorrido a dois — um dia por vez, de 30 de março a 31 de dezembro de 2026. Cada dia traz uma referência bíblica, uma reflexão para o casal e um motivo de oração.',
        'Não há obrigação de seguir a ordem exata. Se um dia for mais intenso que o outro, voltem quando puderem. O objetivo não é perfeição no cumprimento — é crescimento na presença de Deus juntos.',
        'O plano está organizado em <b>10 blocos temáticos</b>, cada um com um arco narrativo e espiritual próprio. Os blocos alternam entre Antigo e Novo Testamento, Salmos e Escritos, criando uma leitura equilibrada e progressiva.',
        'No final de cada dia, use o espaço de anotações para registrar o que Deus falou a cada um. Essas notas serão um tesouro daqui a alguns anos.',
    ]
    for t in intro_text:
        elements.append(Paragraph(t, styles['intro_body']))

    elements.append(Spacer(1, 6 * mm))
    elements.append(Paragraph('Os 10 Blocos Temáticos', styles['section_title']))
    elements.append(HRFlowable(width='100%', thickness=0.5, color=GOLD_LIGHT, spaceAfter=8))

    for num, title, sub, d_start, d_end in BLOCOS:
        row = [
            Paragraph(f'Bloco {num}', styles['bloco_num']),
            Paragraph(f'<b>{title}</b><br/><i>{sub}</i>', ParagraphStyle(
                'bt', fontName='Times-Roman', fontSize=10, leading=14, textColor=INK_MID)),
            Paragraph(f'Dias {d_start}–{d_end}', styles['bloco_days']),
        ]
        t = Table([row], colWidths=[22*mm, 110*mm, 28*mm])
        t.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
            ('TOPPADDING', (0,0), (-1,-1), 5),
            ('BOTTOMPADDING', (0,0), (-1,-1), 5),
            ('LINEBELOW', (0,0), (-1,-1), 0.3, CREAM_DARK),
        ]))
        elements.append(t)

    elements.append(Spacer(1, 8 * mm))
    elements.append(Paragraph('Legenda', styles['section_title']))
    legend = [
        ('●', SKY,  'Antigo Testamento (AT)'),
        ('●', ROSE, 'Novo Testamento (NT)'),
        ('●', MOSS, 'Livros Poéticos / Salmos'),
    ]
    for sym, color, label in legend:
        p = ParagraphStyle('leg', fontName='Helvetica', fontSize=10, leading=16, textColor=INK_MID)
        colored = f'<font color="#{color.hexval().replace('0x','').upper()}">■</font>  {label}'
        elements.append(Paragraph(colored, p))

    elements.append(PageBreak())
    return elements


def oracao_box(oracao_text, styles):
    """Caixa de oração com borda esquerda dourada."""
    inner = [
        [Paragraph('MOTIVO DE ORAÇÃO', styles['oracao_label']),],
        [Paragraph(oracao_text, styles['oracao']),],
    ]
    inner_t = Table(inner, colWidths=[135*mm])
    inner_t.setStyle(TableStyle([
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
        ('BACKGROUND', (0,0), (-1,-1), HexColor('#FAF5EE')),
    ]))

    wrapper = Table([[inner_t]], colWidths=[139*mm])
    wrapper.setStyle(TableStyle([
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('LINEBEFORE', (0,0), (-1,-1), 2.5, GOLD),
        ('BACKGROUND', (0,0), (-1,-1), HexColor('#FAF5EE')),
    ]))
    return wrapper


def build_day_block(day_num, theme, ref, tipo, reflexao, oracao, styles):
    """Monta o bloco de um único dia."""
    tipo_color = TIPO_COLOR[tipo]
    tipo_hex = f'#{tipo_color.hexval().replace('0x','').upper()}'
    tipo_label_str = TIPO_LABEL[tipo]
    date_s = date_str(day_num)

    header_row = Table([[
        Paragraph(f'<font color="{tipo_hex}">●</font>', ParagraphStyle(
            'd_dot', fontName='Helvetica', fontSize=10, textColor=tipo_color)),
        Paragraph(f'<b>Dia {day_num}</b>  <font color="#9C8870">{date_s} · {tipo_label_str}</font>',
                  ParagraphStyle('d_head', fontName='Helvetica', fontSize=8.5, leading=12, textColor=INK)),
    ]], colWidths=[6*mm, 134*mm])
    header_row.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
    ]))

    elements = [
        header_row,
        Paragraph(theme, styles['day_title']),
        Paragraph(f'📖  {ref}', styles['day_ref']),
        Paragraph('REFLEXÃO', styles['label']),
        Spacer(1, 2),
        Paragraph(reflexao, styles['reflexao']),
        Spacer(1, 4),
        oracao_box(oracao, styles),
        Spacer(1, 5),
        # Notes lines
        Paragraph('ANOTAÇÕES', styles['notes_label']),
    ]
    # Draw 3 note lines using HRFlowable
    for _ in range(3):
        elements.append(HRFlowable(width='100%', thickness=0.4, color=CREAM_DARK, spaceAfter=5, spaceBefore=5))

    return elements


def build_days_pages(styles):
    elements = []
    bloco_atual = 0

    for day in DAYS:
        day_num, theme, ref, tipo, reflexao, oracao = day

        # Bloco header
        bloco_idx = next(i for i, b in enumerate(BLOCOS) if b[3] <= day_num <= b[4])
        bloco = BLOCOS[bloco_idx]
        if bloco[0] != bloco_atual:
            bloco_atual = bloco[0]
            # Bloco separator
            elements.append(Spacer(1, 4 * mm))
            bloco_table = Table([[
                Paragraph(f'BLOCO {bloco[0]}', styles['bloco_num']),
                Paragraph(f'<b>{bloco[1]}</b>', styles['bloco_title']),
            ]], colWidths=[22*mm, 118*mm])
            bloco_table.setStyle(TableStyle([
                ('VALIGN', (0,0), (-1,-1), 'BOTTOM'),
                ('LINEBELOW', (0,0), (-1,-1), 0.8, GOLD_LIGHT),
                ('BOTTOMPADDING', (0,0), (-1,-1), 5),
            ]))
            elements.append(bloco_table)
            elements.append(Spacer(1, 5 * mm))

        block_elements = build_day_block(day_num, theme, ref, tipo, reflexao, oracao, styles)
        # Keep each day together if possible
        elements.append(KeepTogether(block_elements))
        elements.append(Spacer(1, 6 * mm))
        elements.append(HRFlowable(width='100%', thickness=0.5, color=CREAM_DARK, spaceAfter=6))

    # Placeholder indicator for days 29–276
    elements.append(Spacer(1, 6 * mm))
    placeholder_style = ParagraphStyle('ph', fontName='Times-Italic', fontSize=10,
                                       leading=16, textColor=INK_LIGHT, alignment=TA_CENTER)
    elements.append(HRFlowable(width='100%', thickness=0.5, color=GOLD_LIGHT, spaceAfter=6))
    elements.append(Paragraph(
        'Os dias 29–276 continuam no aplicativo digital<br/>com reflexões e orações completas para cada dia.',
        placeholder_style))
    elements.append(HRFlowable(width='100%', thickness=0.5, color=GOLD_LIGHT, spaceBefore=6))
    elements.append(PageBreak())
    return elements


def build_index(styles):
    elements = []
    elements.append(Spacer(1, 8 * mm))
    elements.append(Paragraph('Índice de Livros Bíblicos', styles['section_title']))
    elements.append(HRFlowable(width='100%', thickness=0.5, color=GOLD_LIGHT, spaceAfter=8))

    index_data = [
        ('Gênesis',               '1, 2, 3, 4, 5, 6, 7', 'at'),
        ('Êxodo',                 '15, 29–38', 'at'),
        ('Levítico',              '57–63', 'at'),
        ('Números',               '20, 57–63', 'at'),
        ('Rute',                  '12', 'at'),
        ('1–2 Samuel',            '197–210', 'at'),
        ('1–2 Reis',              '211–224', 'at'),
        ('Ester',                 '218', 'at'),
        ('Neemias',               '219', 'at'),
        ('Daniel',                '220', 'at'),
        ('Jó',                    '25', 'at'),
        ('Salmos',                '13, 19, 21, 24, 225–252', 'sal'),
        ('Provérbios',            '22, 23, 141–155', 'at'),
        ('Eclesiastes',           '24, 156–162', 'sal'),
        ('Cântico dos Cânticos',  '10, 21', 'sal'),
        ('Isaías',                '17, 85–91', 'at'),
        ('Jeremias',              '92–98', 'at'),
        ('Ezequiel',              '99–105', 'at'),
        ('Mateus',                '9, 27, 253–259', 'nt'),
        ('Marcos',                '113–119', 'nt'),
        ('Lucas',                 '16, 120–126', 'nt'),
        ('João',                  '1, 127–133', 'nt'),
        ('Romanos',               '26, 169–172', 'nt'),
        ('1 Coríntios',           '18, 26, 173–175', 'nt'),
        ('2 Coríntios',           '176–177', 'nt'),
        ('Gálatas',               '178–179', 'nt'),
        ('Efésios',               '8, 23, 180–181', 'nt'),
        ('Filipenses',            '11, 182', 'nt'),
        ('Colossenses',           '28, 183', 'nt'),
        ('1–2 Timóteo',           '184–186', 'nt'),
        ('Tiago',                 '163–168', 'nt'),
        ('1 Pedro',               '187–189', 'nt'),
        ('1 João',                '14, 190–192', 'nt'),
        ('Hebreus',               '260–264', 'nt'),
        ('Apocalipse',            '265–276', 'nt'),
    ]

    rows = []
    for book, days_str, tipo in index_data:
        color = TIPO_COLOR[tipo]
        colored_book = f'<font color="#{color.hexval().replace('0x','').upper()}">■</font>  <b>{book}</b>'
        rows.append([
            Paragraph(colored_book, ParagraphStyle('ib', fontName='Helvetica', fontSize=9.5,
                                                    leading=14, textColor=INK)),
            Paragraph(f'Dias {days_str}', ParagraphStyle('id', fontName='Times-Roman', fontSize=9.5,
                                                           leading=14, textColor=INK_MID)),
        ])

    # Two-column layout via two-column table
    half = len(rows) // 2 + len(rows) % 2
    left_rows = rows[:half]
    right_rows = rows[half:]

    # Pad right if needed
    while len(right_rows) < len(left_rows):
        right_rows.append([Paragraph('', styles['index_ref']), Paragraph('', styles['index_ref'])])

    combined = []
    for left, right in zip(left_rows, right_rows):
        combined.append([left[0], left[1], Spacer(5*mm, 1), right[0], right[1]])

    t = Table(combined, colWidths=[42*mm, 42*mm, 6*mm, 42*mm, 42*mm])
    t.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LINEBELOW', (0,0), (-1,0), 0.3, CREAM_DARK),
    ]))
    elements.append(t)
    elements.append(PageBreak())
    return elements


def build_finish_page(styles):
    elements = []
    elements.append(Spacer(1, 30 * mm))

    orn = Paragraph('✦ ✦ ✦', ParagraphStyle(
        'f_orn', fontName='Helvetica', fontSize=18, alignment=TA_CENTER,
        textColor=GOLD_LIGHT, spaceAfter=10, letterSpacing=10))
    elements.append(orn)

    elements.append(Paragraph('31 de dezembro de 2026', styles['finish_title']))
    elements.append(Spacer(1, 4 * mm))
    elements.append(Paragraph(
        'Chegamos. Esta página foi deixada em branco<br/>para que vocês a escrevam juntos — hoje.',
        styles['finish_verse']))
    elements.append(Spacer(1, 16 * mm))

    # Big blank space for writing
    note_prompts = [
        'O que Deus fez em nós durante essa jornada:',
        'O que aprendemos um sobre o outro:',
        'Uma palavra para o próximo capítulo:',
    ]
    for prompt in note_prompts:
        elements.append(Paragraph(prompt, ParagraphStyle(
            'fp', fontName='Helvetica', fontSize=9, textColor=INK_LIGHT, spaceAfter=4, letterSpacing=0.5)))
        for _ in range(4):
            elements.append(HRFlowable(width='100%', thickness=0.4, color=CREAM_DARK,
                                        spaceAfter=7, spaceBefore=7))
        elements.append(Spacer(1, 5 * mm))

    elements.append(Spacer(1, 10 * mm))
    elements.append(Paragraph(
        '"O Espírito e a noiva dizem: Vem!"<br/>Apocalipse 22:17',
        ParagraphStyle('f_verse', fontName='Times-Italic', fontSize=11, leading=18,
                       alignment=TA_CENTER, textColor=INK_LIGHT)))
    return elements


# ─── Main ─────────────────────────────────────────────────────────────────────
def generate_pdf(output_path: str, photo_path: str | None = None):
    styles = make_styles()

    doc = BaseDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=MARGIN_X,
        rightMargin=MARGIN_X,
        topMargin=MARGIN_Y,
        bottomMargin=20 * mm,
        title='Nossa Jornada com Deus',
        author='Para dois',
        subject='Plano devocional 2026',
    )

    # Two page templates: cover (dark) and content (light)
    cover_frame = Frame(0, 0, W, H, leftPadding=MARGIN_X, rightPadding=MARGIN_X,
                        topPadding=MARGIN_Y, bottomPadding=20*mm, id='cover')
    content_frame = Frame(MARGIN_X, 20*mm, W - 2*MARGIN_X, H - MARGIN_Y - 20*mm, id='content')

    doc.addPageTemplates([
        PageTemplate(id='Cover', frames=[cover_frame], onPage=draw_cover_bg),
        PageTemplate(id='Content', frames=[content_frame], onPage=draw_page_bg),
    ])

    story = []
    story += build_cover(styles, photo_path)
    from reportlab.platypus import NextPageTemplate
    story.append(NextPageTemplate('Content'))
    story.append(PageBreak())
    story += build_intro(styles)
    story += build_days_pages(styles)
    story += build_index(styles)
    story += build_finish_page(styles)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f'✦ PDF gerado: {output_path}')


if __name__ == '__main__':
    out = '/home/claude/nossa-jornada/nossa_jornada_devocional.pdf'
    photo = '/mnt/user-data/uploads/WhatsApp_Image_2026-02-12_at_13_18_49.jpeg'
    generate_pdf(out, photo if os.path.exists(photo) else None)
