#!/usr/bin/env python3

from random import randint, choice as rc
from faker import Faker

from rosters import ROSTERS

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
        fake_league_names = [
            "Thunderous Beard Ballers",
            "Macho Mavericks Showdown",
            "Savage Mustache Masters",
            "Brutal Bulldozer Brawlers",
            "Viking Victorious Invitational",
            "Galactic Gladiator Goal-getters",
            "Warrior Whiskey Wizards",
            "Titanium Tornado Tacklers",
            "Ferocious Fireball Fighters",
            "Mighty Moose Maulers Cup",
            "Pirate Punch Premier",
            "Rambunctious Rhino Rovers",
            "Snarling Sasquatch Strikers",
            "Buffalo Blitzkrieg Bash",
            "Ninja Narwhal Navigators",
            "Mullet Mayhem Premier",
            "Rebel Rooster Renegades",
            "Voracious Viking Victory",
            "Kangaroo Kickflip Kings",
            "Sizzling Sasquatch Soccer",
            "Arsenal Avengers League",
            "Manchester Mayhem Premier",
            "Liverpool Legends Cup",
            "Chelsea Champions Showcase",
            "Tottenham Titans Tournament",
            "Manchester City Machismo Invitational",
            "Leicester Lionhearted Cup",
            "Wolverhampton Whirlwind Wizards",
            "Everton Enforcers Premier",
            "West Ham Hammerhead Heroes",
        ]
        leagues = []
        for _ in range(20):
            league = League(
                name=rc(fake_league_names),
                manager_id=rc(users).id,
            )
            db.session.add(league)
            leagues.append(league)
        db.session.commit()

        print("Seeding teams...")
        owner_team_names = [
            "Tea and Tackles Titans",
            "Biscuit Bandits FC",
            "Pint-sized Prowess Pirates",
            "Scone Seekers United",
            "Whiskey Wizards XI",
            "Chuckle Brothers City",
            "Bangers and Mash Mavericks",
            "Tweed Tornado Tacklers",
            "Banter Brigade FC",
            "Cuppa and Crumpet Crew",
            "Leek and Lobster Legends",
            "Prawn Sandwich Pirates",
            "Quirky Quavers XI",
            "Wit and Wisdom Wanderers",
            "Brolly Brigade Ballers",
            "Wry Wit Wolves",
            "Plucky Pigeon Punters",
            "Roaring Riotous Rhinos",
            "Cheeky Chip Butties FC",
            "Fizz and Folly Footballers",
            "Cucumber Sandwich Centurions",
            "Manchester Mirth Makers",
            "Liverpool Lollygaggers",
            "London Limerick Lions",
            "Cheese and Cracker City",
            "Witty Whistleblowers United",
            "Jolly Jester Jaguars",
            "Limey Laughter Legends",
            "Proper Pint Prowess",
            "Clever Chortle Champions",
        ]
        teams = []
        for league in leagues:
            for _ in range(6):
                team = Team(
                    name=rc(owner_team_names),
                    owner_id=rc(users).id,
                    league_id=league.id,
                )
                db.session.add(team)
                teams.append(team)
        db.session.commit()

        print("Seeding players...")

        # position = ["Keeper", "Defender", "Midfielder", "Striker"]
        def find_random_player_by_position(position, rosters):
            matching_players = []

            for team in rosters:
                matching_players.extend(
                    [
                        player
                        for player in team["players"]
                        if player["position"] == position
                    ]
                )

            if matching_players:
                return rc(matching_players)
            else:
                return None

        players = []
        for team in teams:
            gk = find_random_player_by_position("Goalkeeper", ROSTERS)
            if gk:
                player = Player(
                    name=gk["name"],
                    position="Goalkeeper",
                    team_id=team.id,
                )
                db.session.add(player)
                players.append(player)
            for _ in range(4):
                fb = find_random_player_by_position("Defender", ROSTERS)
                if fb:
                    player = Player(
                        name=fb["name"],
                        position="Defender",
                        team_id=team.id,
                    )
                    db.session.add(player)
                    players.append(player)
            for _ in range(3):
                mf = find_random_player_by_position("Midfielder", ROSTERS)
                if mf:
                    player = Player(
                        name=mf["name"],
                        position="Midfielder",
                        team_id=team.id,
                    )
                    db.session.add(player)
                    players.append(player)
            for _ in range(3):
                at = find_random_player_by_position("Attacker", ROSTERS)
                if at:
                    player = Player(
                        name=at["name"],
                        position="Attacker",
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
