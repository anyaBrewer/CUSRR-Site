from datetime import datetime
from models import db, User, Presentation, BlockSchedule
from csv_importer import import_users_from_csv

def setup_permissions():
    """Import permissions from a CSV file named 'permissions.csv'."""
    try:
        with open('permissions.csv', 'rb') as file:
            added, warnings = import_users_from_csv(file)
            print(f"Imported {added} users from permissions.csv")
            for warning in warnings:
                print(f"Warning: {warning}")
    except FileNotFoundError:
        print("permissions.csv file not found. Skipping permissions setup.")

def seed_data():
    print("Seeding schedule...")

    # Avoid duplicating schedules
    if BlockSchedule.query.count() > 0:
        print("Schedules already exist, skipping.")
        return

    # Helper to parse string into datetime
    def parse_time(time_str):
        return datetime.strptime(time_str, "%Y-%m-%d %H:%M")

    # --- BLOCKS ---
    opening = BlockSchedule(
        title="Opening Remarks",
        start_time=parse_time("2026-11-06 08:30"),
        end_time=parse_time("2026-11-06 09:00"),
        location="Main Hall",
        day="Day 1"
    )

    keynote = BlockSchedule(
        title="Keynote Address",
        start_time=parse_time("2026-11-06 09:00"),
        end_time=parse_time("2026-11-06 10:00"),
        location="Auditorium",
        day="Day 1"
    )

    poster_session_1 = BlockSchedule(
        title="Poster Session I",
        start_time=parse_time("2026-11-06 10:15"),
        end_time=parse_time("2026-11-06 11:00"),
        location="Exhibition Hall",
        day="Day 1"
    )

    lunch = BlockSchedule(
        title="Lunch Break",
        start_time=parse_time("2026-11-06 12:00"),
        end_time=parse_time("2026-11-06 13:00"),
        location="Courtyard",
        day="Day 1"
    )

    db.session.add_all([opening, keynote, poster_session_1, lunch])
    db.session.flush()  # ensures IDs are assigned

    # --- PRESENTATIONS ---
    opening_talk = Presentation(
        title="Opening Remarks",
        type="session",
        abstract="Welcome by the organizing committee and conference chair.",
        schedule_id=opening.id
    )

    keynote_talk = Presentation(
        title="Keynote Address",
        type="keynote",
        abstract="Speaker: Prof. Jane Doe, University of Innovation.",
        schedule_id=keynote.id
    )

    poster_presentations = [
        Presentation(
            title="AI for Environmental Modeling",
            abstract="Poster #A1 -- Jane Doe (University of X)",
            type="poster",
            schedule_id=poster_session_1.id,
        ),
        Presentation(
            title="Neural Nets for Wildlife Tracking",
            abstract="Poster #A2 -- John Smith (Institute Y)",
            type="poster",
            schedule_id=poster_session_1.id
        ),
        Presentation(
            title="Smart Sensor Calibration",
            abstract="Poster #A3 -- Sara Lin (Tech U)",
            type="poster",
            schedule_id=poster_session_1.id
        )
    ]

    db.session.add_all([opening_talk, keynote_talk] + poster_presentations)
    db.session.flush()

    # Unpack poster presentations
    p1, p2, p3 = poster_presentations

    # --- USERS ---
    users = [
        User(firstname="Alice", lastname="Johnson", email="alice@example.com",
             presentation_id=opening_talk.id, activity="Rafting", auth="attendee"),

        User(firstname="Bob", lastname="Smith", email="bob@example.com",
             presentation_id=opening_talk.id, activity="Rafting", auth="abstract grader"),

        User(firstname="Catherine", lastname="Lee", email="catherine@example.com",
             presentation_id=keynote_talk.id, activity="Rafting", auth="attendee"),

        User(firstname="Daniel", lastname="Patel", email="daniel@example.com",
             presentation_id=p1.id, activity="Rafting", auth="attendee"),

        User(firstname="Ella", lastname="Martinez", email="ella@example.com",
             presentation_id=p1.id, activity="Rafting", auth="attendee"),

        User(firstname="Frank", lastname="Nguyen", email="frank@example.com",
             presentation_id=p2.id, activity="Rafting"),

        User(firstname="Grace", lastname="Wong", email="grace@example.com",
             presentation_id=p2.id, activity="Rafting"),

        User(firstname="Hannah", lastname="Kim", email="hannah@example.com",
             presentation_id=p3.id, activity="Rafting"),

        User(firstname="Isaac", lastname="Reed", email="isaac@example.com",
             presentation_id=p3.id, activity="Rafting"),
    ]

    db.session.add_all(users)
    db.session.commit()

    print("✔ Schedule & users seeded successfully!")
