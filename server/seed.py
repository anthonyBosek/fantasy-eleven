#!/usr/bin/env python3

from random import randint, choice as rc
from faker import Faker

from config import app, db
from models.user import User
from models.league import League
from models.team import Team
from models.player import Player
from models.matchup import Matchup

if __name__ == "__main__":
    fake = Faker()

    with app.app_context():
        print("Starting seed...")

        print("Clearing tables...")
        User.query.delete()
        League.query.delete()
        Team.query.delete()
        Player.query.delete()
        Matchup.query.delete()

        print("Seeding users...")
        users = []
        for _ in range(20):
            user = User(
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                username=fake.user_name(),
                email=fake.email(),
            )
            user.password_hash = "passpasspass"
            db.session.add(user)
            users.append(user)
        db.session.commit()

        print("Seeding leagues...")
        leagues = []
        for _ in range(5):
            league = League(
                name=fake.word() + " League",
                manager_id=rc(users).id,
            )
            db.session.add(league)
            leagues.append(league)
        db.session.commit()

        print("Seeding teams...")
        teams = []
        for league in leagues:
            for _ in range(4):
                team = Team(
                    name=fake.word() + " Team",
                    owner_id=rc(users).id,
                    league_id=league.id,
                )
                db.session.add(team)
                teams.append(team)
        db.session.commit()

        print("Seeding players...")
        position = ["Keeper", "Defender", "Midfielder", "Striker"]
        players = []
        for team in teams:
            for _ in range(11):
                player = Player(
                    name=fake.name(),
                    position=rc(position),
                    team_id=team.id,
                )
                db.session.add(player)
                players.append(player)
        db.session.commit()

        print("Seeding matchups...")
        matchups = []
        for league in leagues:
            for _ in range(5):
                matchup = Matchup(
                    week_number=randint(1, 38),
                    league_id=league.id,
                    home_team_id=rc(teams).id,
                    away_team_id=rc(teams).id,
                )
                db.session.add(matchup)
                matchups.append(matchup)
        db.session.commit()

        print("Seed complete!")
        print("Let's get ready to rumble!")
