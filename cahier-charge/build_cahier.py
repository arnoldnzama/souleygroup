from pathlib import Path
from datetime import date
import textwrap
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "cahier-charge"
IMG_OUT = OUT / "images"
PDF_PATH = OUT / "Cahier_des_charges_Souley_Group.pdf"
IMG_OUT.mkdir(parents=True, exist_ok=True)

NAVY = "#0A1628"
NAVY_2 = "#0F2439"
BLUE = "#1B3A5C"
STEEL = "#3D6B99"
GOLD = "#D4A017"
SILVER = "#A8B5C5"
LIGHT = "#F5F7FA"
INK = "#162033"
MUTED = "#667085"


PAGES = [
    {
        "name": "Accueil",
        "file": "index.html",
        "title": "Construire l'Afrique de demain",
        "desc": "Page d'entrée corporate : promesse, chiffres clés, divisions et accès rapides.",
        "features": ["Hero premium", "Chiffres de crédibilité", "Divisions", "Partenaires"],
        "goal": "Installer immédiatement la stature du groupe et guider vers les services.",
    },
    {
        "name": "Le Groupe",
        "file": "groupe.html",
        "title": "Un groupe panafricain d'envergure internationale",
        "desc": "Présentation institutionnelle : histoire, vision, parcours du fondateur, gouvernance et valeurs.",
        "features": ["Biographie", "Vision & mission", "Réalisations", "Valeurs"],
        "goal": "Donner confiance au client, aux partenaires et aux institutions.",
    },
    {
        "name": "Services",
        "file": "services.html",
        "title": "Un écosystème d'excellence",
        "desc": "Catalogue des divisions : construction, mines & énergie, télécoms et fondation.",
        "features": ["4 pôles", "Cartes métiers", "Bénéfices", "CTA contact"],
        "goal": "Clarifier l'offre et favoriser la prise de contact commerciale.",
    },
    {
        "name": "Projets",
        "file": "projets.html",
        "title": "Nos Projets Phares",
        "desc": "Vitrine des réalisations physiques et numériques du groupe.",
        "features": ["Projets filtrables", "Réalisations", "Preuves visuelles", "Impact"],
        "goal": "Transformer les références en arguments de crédibilité.",
    },
    {
        "name": "Fondation",
        "file": "fondation.html",
        "title": "Fondation Souley Group",
        "desc": "Engagement social : santé, éducation, eau potable et développement humain.",
        "features": ["Impact social", "Programmes", "Statistiques", "Engagement"],
        "goal": "Montrer la dimension humaine et responsable du groupe.",
    },
    {
        "name": "Actualités",
        "file": "actualites.html",
        "title": "Les Échos du Groupe",
        "desc": "Espace éditorial pour communiqués, innovations et annonces du groupe.",
        "features": ["Articles", "Communiqués", "Catégories", "Dates"],
        "goal": "Maintenir le site vivant et renforcer la communication corporate.",
    },
    {
        "name": "Événements",
        "file": "evenements.html",
        "title": "Événements & Rencontres",
        "desc": "Calendrier des conférences, inaugurations, salons et forums.",
        "features": ["Agenda", "Rencontres", "Forums", "Inscriptions"],
        "goal": "Valoriser la présence publique et les moments forts du groupe.",
    },
    {
        "name": "Carrières",
        "file": "carrieres.html",
        "title": "Rejoignez Souley Group",
        "desc": "Page RH pour attirer les talents et présenter la culture interne.",
        "features": ["Culture", "Offres", "Avantages", "Candidature"],
        "goal": "Structurer le recrutement et donner une image employeur moderne.",
    },
    {
        "name": "Contact",
        "file": "contact.html",
        "title": "Bâtissons Ensemble",
        "desc": "Formulaire, coordonnées et points d'entrée pour les demandes client.",
        "features": ["Formulaire", "Coordonnées", "Localisation", "CTA"],
        "goal": "Convertir les visiteurs en prospects qualifiés.",
    },
    {
        "name": "Administration",
        "file": "admin.html",
        "title": "Admin Panel",
        "desc": "Interface interne de gestion des contenus et des données du site.",
        "features": ["Back-office", "Sécurité", "Gestion contenus", "Maintenance"],
        "goal": "Permettre une gestion autonome après livraison.",
    },
]


def font(size, bold=False):
    fonts_dir = Path("C:/Windows/Fonts")
    candidates = ["arialbd.ttf" if bold else "arial.ttf", "segoeuib.ttf" if bold else "segoeui.ttf"]
    for name in candidates:
        path = fonts_dir / name
        if path.exists():
            return ImageFont.truetype(str(path), size=size)
    return ImageFont.load_default()


def register_fonts():
    fonts_dir = Path("C:/Windows/Fonts")
    regular = fonts_dir / "arial.ttf"
    bold = fonts_dir / "arialbd.ttf"
    if regular.exists():
        pdfmetrics.registerFont(TTFont("DocRegular", str(regular)))
    if bold.exists():
        pdfmetrics.registerFont(TTFont("DocBold", str(bold)))


def draw_wrapped(draw, text, xy, max_width, fnt, fill, line_gap=8):
    x, y = xy
    words = text.split()
    lines, line = [], ""
    for word in words:
        trial = f"{line} {word}".strip()
        if draw.textbbox((0, 0), trial, font=fnt)[2] <= max_width:
            line = trial
        else:
            if line:
                lines.append(line)
            line = word
    if line:
        lines.append(line)
    for line in lines:
        draw.text((x, y), line, font=fnt, fill=fill)
        y += fnt.size + line_gap
    return y


def rounded_rect(draw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def make_page_visual(page, idx):
    w, h = 1600, 980
    img = Image.new("RGB", (w, h), LIGHT)
    draw = ImageDraw.Draw(img)

    for y in range(h):
        ratio = y / h
        r = int(10 + 14 * ratio)
        g = int(22 + 36 * ratio)
        b = int(40 + 62 * ratio)
        draw.line([(0, y), (w, y)], fill=(r, g, b))

    # Browser shell
    margin = 82
    shell = (margin, 70, w - margin, h - 70)
    shadow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sd.rounded_rectangle((shell[0] + 18, shell[1] + 24, shell[2] + 18, shell[3] + 24), 38, fill=(0, 0, 0, 70))
    shadow = shadow.filter(ImageFilter.GaussianBlur(24))
    img = Image.alpha_composite(img.convert("RGBA"), shadow).convert("RGB")
    draw = ImageDraw.Draw(img)
    rounded_rect(draw, shell, 34, "#FFFFFF")

    top = (shell[0], shell[1], shell[2], shell[1] + 82)
    rounded_rect(draw, top, 34, "#EEF2F7")
    draw.rectangle((shell[0], shell[1] + 44, shell[2], shell[1] + 82), fill="#EEF2F7")
    for i, c in enumerate(["#EF4444", "#F59E0B", "#22C55E"]):
        draw.ellipse((shell[0] + 36 + i * 34, shell[1] + 31, shell[0] + 54 + i * 34, shell[1] + 49), fill=c)
    rounded_rect(draw, (shell[0] + 190, shell[1] + 22, shell[2] - 42, shell[1] + 60), 18, "#FFFFFF", "#D7DEE8")
    draw.text((shell[0] + 216, shell[1] + 31), f"souleygroup.cd/{page['file']}", font=font(20), fill="#667085")

    body = (shell[0], shell[1] + 82, shell[2], shell[3])
    draw.rectangle(body, fill="#FFFFFF")
    hero_h = 330
    draw.rectangle((body[0], body[1], body[2], body[1] + hero_h), fill=BLUE)
    for x in range(body[0], body[2], 5):
        ratio = (x - body[0]) / (body[2] - body[0])
        color = (
            int(10 + 51 * ratio),
            int(22 + 85 * ratio),
            int(40 + 113 * ratio),
        )
        draw.line([(x, body[1]), (x, body[1] + hero_h)], fill=color, width=5)
    draw.rectangle((body[0], body[1], body[2], body[1] + hero_h), fill=(0, 0, 0), outline=None)
    overlay = Image.new("RGBA", (body[2] - body[0], hero_h), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    for y in range(hero_h):
        od.line([(0, y), (body[2] - body[0], y)], fill=(10, 22, 40, int(80 + 80 * y / hero_h)))
    crop = Image.new("RGBA", (body[2] - body[0], hero_h), BLUE)
    crop = Image.alpha_composite(crop, overlay)
    img.paste(crop.convert("RGB"), (body[0], body[1]))
    draw = ImageDraw.Draw(img)

    # Header
    draw.rectangle((body[0], body[1], body[2], body[1] + 82), fill="#FFFFFF")
    logo_path = ROOT / "logo" / "sg.png"
    if logo_path.exists():
        logo = Image.open(logo_path).convert("RGBA")
        logo.thumbnail((170, 70))
        img.paste(logo, (body[0] + 34, body[1] + 8), logo)
    nav_x = body[2] - 590
    for label in ["Groupe", "Services", "Projets", "Contact"]:
        draw.text((nav_x, body[1] + 31), label, font=font(19, True), fill=BLUE)
        nav_x += 132
    rounded_rect(draw, (body[2] - 130, body[1] + 22, body[2] - 36, body[1] + 60), 8, GOLD)
    draw.text((body[2] - 105, body[1] + 31), "CTA", font=font(18, True), fill="#FFFFFF")

    hero_y = body[1] + 138
    draw.text((body[0] + 60, hero_y), page["name"].upper(), font=font(24, True), fill=GOLD)
    draw_wrapped(draw, page["title"], (body[0] + 60, hero_y + 44), 840, font(58, True), "#FFFFFF", 10)
    draw_wrapped(draw, page["desc"], (body[0] + 60, hero_y + 186), 760, font(28), "#DCE6F2", 8)

    # Content cards
    card_y = body[1] + hero_h + 48
    card_w = 280
    for i, feature in enumerate(page["features"]):
        x = body[0] + 60 + i * (card_w + 28)
        rounded_rect(draw, (x, card_y, x + card_w, card_y + 150), 18, "#F8FAFC", "#E5EAF1", 2)
        draw.ellipse((x + 24, card_y + 24, x + 72, card_y + 72), fill="#FFF4D6")
        draw.text((x + 39, card_y + 33), str(i + 1), font=font(26, True), fill=GOLD)
        draw_wrapped(draw, feature, (x + 24, card_y + 90), card_w - 48, font(24, True), INK, 6)

    rounded_rect(draw, (body[0] + 60, card_y + 205, body[2] - 60, card_y + 335), 20, "#0F2439")
    draw.text((body[0] + 92, card_y + 235), "Objectif fonctionnel", font=font(24, True), fill=GOLD)
    draw_wrapped(draw, page["goal"], (body[0] + 92, card_y + 274), body[2] - body[0] - 184, font(28), "#FFFFFF", 8)

    visual_path = IMG_OUT / f"{idx:02d}_{page['name'].lower().replace('é', 'e').replace('è', 'e').replace(' ', '_')}.png"
    img.save(visual_path, quality=95)
    return visual_path


def c_text(c, text, x, y, size=14, fill=INK, bold=False, max_width=None, leading=None):
    c.setFillColor(colors.HexColor(fill))
    c.setFont("DocBold" if bold else "DocRegular", size)
    if not max_width:
        c.drawString(x, y, text)
        return y - size * 1.25
    if leading is None:
        leading = size * 1.35
    lines = []
    avg = size * 0.48
    chars = max(20, int(max_width / avg))
    for para in text.split("\n"):
        lines.extend(textwrap.wrap(para, width=chars) or [""])
    for line in lines:
        c.drawString(x, y, line)
        y -= leading
    return y


def add_header(c, title, page_num):
    w, h = landscape(A4)
    c.setFillColor(colors.HexColor(NAVY))
    c.rect(0, h - 46, w, 46, fill=1, stroke=0)
    c.setFillColor(colors.HexColor(GOLD))
    c.rect(0, h - 49, w, 3, fill=1, stroke=0)
    c.setFillColor(colors.white)
    c.setFont("DocBold", 11)
    c.drawString(32, h - 29, title)
    c.setFont("DocRegular", 9)
    c.drawRightString(w - 32, h - 29, f"Souley Group | {page_num:02d}")


def add_footer(c):
    w, _ = landscape(A4)
    c.setFillColor(colors.HexColor("#D9E1EA"))
    c.line(32, 28, w - 32, 28)
    c.setFillColor(colors.HexColor(MUTED))
    c.setFont("DocRegular", 8)
    c.drawString(32, 14, "Document de présentation client - cahier des charges web")


def bullet(c, text, x, y, max_width=310):
    c.setFillColor(colors.HexColor(GOLD))
    c.circle(x, y + 4, 3.5, fill=1, stroke=0)
    return c_text(c, text, x + 14, y, 11.5, INK, False, max_width=max_width, leading=15)


def section_card(c, x, y, w, h, title, body):
    c.setFillColor(colors.HexColor("#FFFFFF"))
    c.roundRect(x, y, w, h, 10, fill=1, stroke=0)
    c.setStrokeColor(colors.HexColor("#E3E8EF"))
    c.roundRect(x, y, w, h, 10, fill=0, stroke=1)
    c.setFillColor(colors.HexColor(GOLD))
    c.rect(x, y + h - 5, w, 5, fill=1, stroke=0)
    c_text(c, title, x + 18, y + h - 30, 14, BLUE, True)
    c_text(c, body, x + 18, y + h - 54, 10.5, MUTED, False, max_width=w - 36, leading=14)


def build_pdf(visuals):
    register_fonts()
    w, h = landscape(A4)
    c = canvas.Canvas(str(PDF_PATH), pagesize=landscape(A4))
    page_num = 1

    # Cover
    c.setFillColor(colors.HexColor(NAVY))
    c.rect(0, 0, w, h, fill=1, stroke=0)
    c.setFillColor(colors.HexColor(GOLD))
    c.rect(0, h - 12, w, 12, fill=1, stroke=0)
    c.circle(w - 90, h - 90, 230, fill=0, stroke=1)
    c.setStrokeColor(colors.HexColor("#244A73"))
    for r in [120, 170, 220]:
        c.circle(w - 90, h - 90, r, fill=0, stroke=1)
    logo_path = ROOT / "logo" / "sg.png"
    if logo_path.exists():
        c.drawImage(ImageReader(str(logo_path)), 42, h - 125, width=105, height=72, preserveAspectRatio=True, mask="auto")
    c_text(c, "CAHIER DES CHARGES", 48, h - 205, 34, "#FFFFFF", True)
    c_text(c, "Projet web corporate Souley Group", 48, h - 252, 25, GOLD, True)
    c_text(c, "Présentation client : objectifs, parcours utilisateur, structure technique, pages livrées et procédure de mise en production.", 50, h - 306, 14, "#DCE6F2", False, max_width=470, leading=20)
    c.setFillColor(colors.HexColor("#FFFFFF"))
    c.roundRect(50, 66, 360, 86, 14, fill=1, stroke=0)
    c_text(c, "Version de présentation", 74, 124, 12, MUTED, True)
    c_text(c, f"Souley Group - {date.today().strftime('%d/%m/%Y')}", 74, 100, 16, INK, True)
    c.showPage()
    page_num += 1

    add_header(c, "1. Synthèse du projet", page_num)
    c_text(c, "Objectif général", 42, h - 92, 24, BLUE, True)
    c_text(c, "Créer une plateforme corporate premium pour présenter Souley Group, valoriser ses divisions, ses projets, sa fondation, son actualité et ses points de contact. Le site doit inspirer confiance aux clients, institutions, partenaires, talents et médias.", 42, h - 130, 13, INK, False, max_width=760, leading=18)
    section_card(c, 42, 245, 230, 150, "Image de marque", "Design institutionnel, palette inspirée du logo, hiérarchie claire et langage visuel premium.")
    section_card(c, 304, 245, 230, 150, "Conversion", "Parcours vers les demandes de contact, les services, les projets et les opportunités de recrutement.")
    section_card(c, 566, 245, 230, 150, "Autonomie", "Structure prête pour l'actualisation : contenus éditoriaux, administration et maintenance.")
    c_text(c, "Publics visés", 42, 203, 18, BLUE, True)
    y = 174
    for item in ["Clients privés et institutionnels", "Partenaires industriels et financiers", "Talents et candidats", "Presse, communautés et acteurs publics"]:
        y = bullet(c, item, 52, y, 350)
    add_footer(c)
    c.showPage()
    page_num += 1

    add_header(c, "2. Procédure complète du projet web", page_num)
    steps = [
        ("01", "Cadrage", "Définition des objectifs, pages, contenus, tonalité, cibles et priorités business."),
        ("02", "Architecture", "Organisation des rubriques, navigation, composants partagés, parcours de conversion."),
        ("03", "Design UI", "Création d'une identité visuelle web : couleurs, typographies, cartes, boutons, sections et responsive."),
        ("04", "Intégration", "Développement HTML/CSS/JS avec composants communs : header, footer, chatbot, animations."),
        ("05", "Contenu", "Insertion des textes, images, pages métiers, actualités, événements et formulaires."),
        ("06", "Back-end", "Serveur Node.js/Express, préparation base MySQL, routes API et environnement de configuration."),
        ("07", "Tests", "Contrôle desktop, tablette, mobile, liens, formulaires, chargement, lisibilité et cohérence graphique."),
        ("08", "Livraison", "Mise en production, transfert client, documentation, maintenance et évolutions futures."),
    ]
    x0, y0 = 44, h - 105
    for i, (num, title, body) in enumerate(steps):
        col = i % 4
        row = i // 4
        x = x0 + col * 198
        y = y0 - row * 202
        c.setFillColor(colors.HexColor("#FFFFFF"))
        c.roundRect(x, y - 142, 172, 142, 12, fill=1, stroke=0)
        c.setStrokeColor(colors.HexColor("#E2E8F0"))
        c.roundRect(x, y - 142, 172, 142, 12, fill=0, stroke=1)
        c.setFillColor(colors.HexColor(GOLD))
        c.roundRect(x + 16, y - 42, 42, 32, 8, fill=1, stroke=0)
        c_text(c, num, x + 26, y - 33, 12, "#FFFFFF", True)
        c_text(c, title, x + 16, y - 66, 14, BLUE, True)
        c_text(c, body, x + 16, y - 91, 9.8, MUTED, False, max_width=138, leading=13)
    add_footer(c)
    c.showPage()
    page_num += 1

    add_header(c, "3. Architecture fonctionnelle et technique", page_num)
    c_text(c, "Structure du site", 42, h - 92, 22, BLUE, True)
    c_text(c, "Le site repose sur une architecture claire : pages publiques statiques, composants partagés injectés en JavaScript, feuilles de styles communes, serveur Node.js/Express et préparation MySQL pour les données dynamiques.", 42, h - 126, 12.5, INK, False, max_width=760, leading=17)
    section_card(c, 42, 292, 245, 124, "Front-end", "HTML5, Tailwind CDN, CSS personnalisé, animations JS, composants réutilisables dans components.js.")
    section_card(c, 304, 292, 245, 124, "Back-end", "Node.js + Express, routes API, configuration .env, serveur local puis hébergement web.")
    section_card(c, 566, 292, 245, 124, "Données", "Préparation SQL/MySQL pour contenus administrables : actualités, événements, contacts et candidatures.")
    c_text(c, "Arborescence livrée", 42, 250, 18, BLUE, True)
    tree = "index.html -> Accueil\ncomponents.js -> Header, footer, chatbot\nstyles.css -> Design system\nserver.js -> Serveur Node/Express\ndatabase.sql -> Structure base de données\npages publiques -> Groupe, Services, Projets, Fondation, Actualités, Événements, Carrières, Contact\nadmin.html + admin.js -> Administration"
    c.setFillColor(colors.HexColor("#0F2439"))
    c.roundRect(42, 58, 760, 170, 14, fill=1, stroke=0)
    c_text(c, tree, 68, 202, 11.5, "#FFFFFF", False, max_width=700, leading=18)
    add_footer(c)
    c.showPage()
    page_num += 1

    add_header(c, "4. Parcours utilisateur", page_num)
    c_text(c, "Navigation pensée pour la décision", 42, h - 92, 22, BLUE, True)
    c_text(c, "Le parcours oriente l'utilisateur selon son intention : comprendre le groupe, explorer l'offre, vérifier les références, découvrir l'impact social, suivre l'actualité ou contacter l'équipe.", 42, h - 126, 12.5, INK, False, max_width=760, leading=17)
    flows = [
        ("Découverte", "Accueil -> Le Groupe -> Services"),
        ("Preuve", "Accueil -> Projets -> Actualités"),
        ("Impact", "Le Groupe -> Fondation -> Événements"),
        ("Conversion", "Services/Projets -> Contact"),
        ("Recrutement", "Accueil -> Carrières -> Candidature"),
    ]
    y = h - 188
    for title, body in flows:
        c.setFillColor(colors.HexColor("#FFFFFF"))
        c.roundRect(68, y - 38, 700, 48, 11, fill=1, stroke=0)
        c.setStrokeColor(colors.HexColor("#E2E8F0"))
        c.roundRect(68, y - 38, 700, 48, 11, fill=0, stroke=1)
        c.setFillColor(colors.HexColor(GOLD))
        c.circle(92, y - 14, 9, fill=1, stroke=0)
        c_text(c, title, 118, y - 8, 13, BLUE, True)
        c_text(c, body, 270, y - 8, 12, MUTED, False)
        y -= 66
    add_footer(c)
    c.showPage()
    page_num += 1

    for idx, (page, visual) in enumerate(zip(PAGES, visuals), start=1):
        add_header(c, f"5.{idx} Page - {page['name']}", page_num)
        c.drawImage(ImageReader(str(visual)), 40, 84, width=470, height=288, preserveAspectRatio=True, mask="auto")
        c_text(c, page["name"], 540, h - 94, 26, BLUE, True)
        c_text(c, page["title"], 540, h - 130, 15, GOLD, True, max_width=260, leading=18)
        c_text(c, page["desc"], 540, h - 176, 11.7, INK, False, max_width=260, leading=16)
        c_text(c, "Rôle dans le projet", 540, h - 244, 14, BLUE, True)
        c_text(c, page["goal"], 540, h - 268, 10.8, MUTED, False, max_width=260, leading=15)
        c_text(c, "Éléments clés", 540, h - 334, 14, BLUE, True)
        y = h - 360
        for feature in page["features"]:
            y = bullet(c, feature, 550, y, 240)
        c.setFillColor(colors.HexColor("#F7F9FC"))
        c.roundRect(540, 62, 258, 42, 8, fill=1, stroke=0)
        c_text(c, f"Fichier : {page['file']}", 558, 78, 10.2, MUTED, True)
        add_footer(c)
        c.showPage()
        page_num += 1

    add_header(c, "6. Responsive, performance et qualité", page_num)
    c_text(c, "Exigences de qualité", 42, h - 92, 22, BLUE, True)
    items = [
        "Responsive desktop, tablette et mobile avec header/footer partagés.",
        "Navigation lisible, logo agrandi sur mobile/tablette et accès menu simplifié.",
        "Cohérence visuelle : palette navy, steel, silver et gold issue de l'identité Souley Group.",
        "Formulaires et appels à l'action visibles pour maximiser les prises de contact.",
        "Structure maintenable : composants centralisés et contenus organisés par page.",
        "Préparation au référencement : titres, descriptions, pages métiers et contenu éditorial.",
    ]
    y = h - 145
    for item in items:
        y = bullet(c, item, 52, y, 710)
    c_text(c, "Contrôles avant validation", 42, 198, 18, BLUE, True)
    c_text(c, "Vérification des liens, lisibilité des textes, cohérence des images, compatibilité mobile/tablette, affichage du header/footer, formulaire de contact, administration et environnement serveur.", 42, 168, 12.5, INK, False, max_width=760, leading=17)
    add_footer(c)
    c.showPage()
    page_num += 1

    add_header(c, "7. Livrables et validation client", page_num)
    deliverables = [
        ("Site web complet", "Toutes les pages publiques et le back-office initial."),
        ("Code source", "HTML, CSS, JavaScript, Node.js, SQL et assets du projet."),
        ("Documentation", "Cahier des charges PDF et explication des composants principaux."),
        ("Mise en production", "Préparation hébergement, variables d'environnement et base de données."),
        ("Maintenance", "Correction, évolution de contenu, ajout de pages et accompagnement."),
    ]
    x, y = 54, h - 112
    for title, body in deliverables:
        section_card(c, x, y - 88, 735, 70, title, body)
        y -= 82
    c.setFillColor(colors.HexColor(NAVY))
    c.roundRect(54, 54, 735, 70, 14, fill=1, stroke=0)
    c_text(c, "Conclusion", 78, 98, 14, GOLD, True)
    c_text(c, "Le projet est conçu comme une vitrine institutionnelle moderne, évolutive et crédible, prête à soutenir la communication et le développement commercial de Souley Group.", 78, 76, 11.5, "#FFFFFF", False, max_width=680, leading=15)
    add_footer(c)
    c.save()


def main():
    real_dir = OUT / "captures-reelles"
    real_visuals = [
        real_dir / "01_accueil.png",
        real_dir / "02_le_groupe.png",
        real_dir / "03_services.png",
        real_dir / "04_projets.png",
        real_dir / "05_fondation.png",
        real_dir / "06_actualites.png",
        real_dir / "07_evenements.png",
        real_dir / "08_carrieres.png",
        real_dir / "09_contact.png",
        real_dir / "10_administration.png",
    ]
    visuals = real_visuals if all(path.exists() for path in real_visuals) else [make_page_visual(page, i + 1) for i, page in enumerate(PAGES)]
    build_pdf(visuals)
    print(PDF_PATH)


if __name__ == "__main__":
    main()
