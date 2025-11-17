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

    # Helper for consistent date/time
    def time_at(hour, minute=0):
        return datetime(2025, 5, 1, hour, minute)

    # --- BLOCKS ---
    opening = BlockSchedule(
        title="Opening Remarks",
        start_time=time_at(8, 30),
        end_time=time_at(9, 0),
        location="Main Hall",
        day="test1"
    )

    keynote = BlockSchedule(
        title="Keynote Address",
        start_time=time_at(9, 0),
        end_time=time_at(10, 0),
        location="Auditorium",
        day="test1"
    )

    poster_session_1 = BlockSchedule(
        title="Poster Session I",
        start_time=time_at(10, 15),
        end_time=time_at(11, 0),
        location="Exhibition Hall",
        day="test1"
    )

    lunch = BlockSchedule(
        title="Lunch Break",
        start_time=time_at(12, 0),
        end_time=time_at(13, 0),
        location="Courtyard",
        day="test1"
    )

    db.session.add_all([opening, keynote, poster_session_1, lunch])
    db.session.flush()  # ensures IDs are assigned

    # --- PRESENTATIONS INSIDE EACH BLOCK ---
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
            schedule_id=poster_session_1.id
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
    db.session.flush()  # we now have presentation IDs

    # Unpack poster presentations for clarity
    p1, p2, p3 = poster_presentations

    # --- Users tied to presentations ---
    users = [
        User(firstname="Alice", lastname="Johnson", email="alice@example.com",
             presentation_id=opening_talk.id, activity="Speaker", auth="organizer"),

        User(firstname="Bob", lastname="Smith", email="bob@example.com",
             presentation_id=opening_talk.id, activity="Co-presenter", auth="abstract grader"),

        User(firstname="Catherine", lastname="Lee", email="catherine@example.com",
             presentation_id=keynote_talk.id, activity="Moderator", auth="attendee"),

        User(firstname="Daniel", lastname="Patel", email="daniel@example.com",
             presentation_id=p1.id, activity="Instructor", auth="attendee"),

        User(firstname="Ella", lastname="Martinez", email="ella@example.com",
             presentation_id=p1.id, activity="Assistant", auth="attendee"),

        User(firstname="Frank", lastname="Nguyen", email="frank@example.com",
             presentation_id=p2.id, activity="Speaker"),

        User(firstname="Grace", lastname="Wong", email="grace@example.com",
             presentation_id=p2.id, activity="Researcher"),

        User(firstname="Hannah", lastname="Kim", email="hannah@example.com",
             presentation_id=p3.id, activity="Presenter"),

        User(firstname="Isaac", lastname="Reed", email="isaac@example.com",
             presentation_id=p3.id, activity="Assistant"),
    ]

    db.session.add_all(users)
    db.session.commit()

    print("✔ Schedule & users seeded successfully!")
