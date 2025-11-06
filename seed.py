from models import db, User, Presentation

def seed_data():
    """Populate the database with initial test data."""

    # --- Presentations ---
    p1 = Presentation(
        title="AI in Education",
        abstract="Exploring how AI is transforming learning.",
        subject="Artificial Intelligence",
        time="2026-11-05 10:00",
        room="Room A",
        type="Blitz"
    )

    p2 = Presentation(
        title="Climate Change and Policy",
        abstract="A discussion on environmental policy.",
        subject="Environmental Studies",
        time="2026-11-05 13:00",
        room="Room B",
        type="Poster"
    )

    p3 = Presentation(
        title="Modern Web Security",
        abstract="Best practices for securing web applications.",
        subject="Cybersecurity",
        time="2026-11-06 09:30",
        room="Room C",
        type="Presentation"
    )

    p4 = Presentation(
        title="Advances in Quantum Computing",
        abstract="An overview of quantum breakthroughs and their implications.",
        subject="Computer Science",
        time="2026-11-06 11:00",
        room="Room D",
        type="Blitz"
    )

    p5 = Presentation(
        title="Renewable Energy Storage",
        abstract="Comparing modern battery technologies and hydrogen storage.",
        subject="Energy Engineering",
        time="2026-11-06 14:00",
        room="Room E",
        type="Poster"
    )

    p6 = Presentation(
        title="Inclusive Design in Technology",
        abstract="How inclusive design improves digital accessibility.",
        subject="Human-Computer Interaction",
        time="2026-11-07 09:00",
        room="Room F",
        type="Presentation"
    )

    p7 = Presentation(
        title="Neuroscience of Decision Making",
        abstract="Exploring brain processes behind human decisions.",
        subject="Neuroscience",
        time="2026-11-07 11:30",
        room="Room G",
        type="Blitz"
    )

    p8 = Presentation(
        title="Ethics of Artificial Intelligence",
        abstract="A philosophical and policy discussion on AI ethics.",
        subject="Philosophy",
        time="2026-11-07 13:30",
        room="Room H",
        type="Presentation"
    )

    p9 = Presentation(
        title="Ocean Plastic Solutions",
        abstract="Innovations to reduce plastic waste in our oceans.",
        subject="Marine Biology",
        time="2026-11-08 10:00",
        room="Room I",
        type="Poster"
    )

    db.session.add_all([p1, p2, p3, p4, p5, p6, p7, p8, p9])
    db.session.commit()

    # --- Users ---
    users = [
        User(firstname="Alice", lastname="Johnson", email="alice@example.com", presentation_id=p1.id, activity="Speaker"),
        User(firstname="Bob", lastname="Smith", email="bob@example.com", presentation_id=p1.id, activity="Co-presenter"),
        User(firstname="Catherine", lastname="Lee", email="catherine@example.com", presentation_id=p2.id, activity="Moderator"),
        User(firstname="Daniel", lastname="Patel", email="daniel@example.com", presentation_id=p3.id, activity="Instructor"),
        User(firstname="Ella", lastname="Martinez", email="ella@example.com", presentation_id=p3.id, activity="Assistant"),

        User(firstname="Frank", lastname="Nguyen", email="frank@example.com", presentation_id=p4.id, activity="Speaker"),
        User(firstname="Grace", lastname="Wong", email="grace@example.com", presentation_id=p4.id, activity="Researcher"),
        User(firstname="Hannah", lastname="Kim", email="hannah@example.com", presentation_id=p5.id, activity="Presenter"),
        User(firstname="Isaac", lastname="Reed", email="isaac@example.com", presentation_id=p5.id, activity="Assistant"),
        User(firstname="Jasmine", lastname="Brown", email="jasmine@example.com", presentation_id=p6.id, activity="Speaker"),

        User(firstname="Kevin", lastname="Lopez", email="kevin@example.com", presentation_id=p6.id, activity="Designer"),
        User(firstname="Laura", lastname="White", email="laura@example.com", presentation_id=p7.id, activity="Researcher"),
        User(firstname="Mason", lastname="Harris", email="mason@example.com", presentation_id=p8.id, activity="Lecturer"),
        User(firstname="Nina", lastname="Garcia", email="nina@example.com", presentation_id=p8.id, activity="Panelist"),
        User(firstname="Owen", lastname="Davis", email="owen@example.com", presentation_id=p9.id, activity="Coordinator"),
    ]

    db.session.add_all(users)
    db.session.commit()

    print("Database seeded with expanded test data!")
