from flask import Flask, render_template, request, redirect, url_for, flash, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin, login_user, LoginManager, login_required, current_user, logout_user
from .CryptoNews import CryptoNews

app = Flask(__name__, instance_relative_config=True)

##CREATE DATABASE
app.config['SECRET_KEY'] = '9efbaa3319d8a6d8d111a8cd3aa2d1fea14781addbf00947'
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///users.db"
#Optional: But it will silence the deprecation warning in the console.
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    username = db.Column(db.String(100))
    password = db.Column(db.String(100))
    bits = db.Column(db.Float)
    ethers = db.Column(db.Float)
    doges = db.Column(db.Float)

    def __repr__(self):
        return "<User %r %r %r %r %r>" % (
            self.id,
            self.username,
            self.bits,
            self.ethers,
            self.doges,
        )



db.create_all()

@app.route('/')
def home():
    #all_users = db.session.query(User).all()
    cn = CryptoNews.getData()

    if (current_user.is_authenticated):
        return render_template("index.html", len=len(cn), news=cn, logged_in=current_user.is_authenticated, user=current_user)
    return render_template("index.html", len=len(cn), news=cn, logged_in=current_user.is_authenticated)

@app.route('/login', methods=["GET", "POST"])
def login():

    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        user = User.query.filter_by(username=username).first()
        if not user:
            flash("An account has not yet been created with that username.")
            return redirect(url_for('login'))
        elif not check_password_hash(user.password, password):
            flash("Incorrect password.")
            return redirect(url_for('login'))
        else:
            login_user(user)
            return redirect(url_for('home'))

    return render_template("login.html")


@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        if User.query.filter_by(username=request.form.get('username')).first():
            #User already exists
            flash("An account with this username already exists.")
            return redirect(url_for('signup'))

        hashpass = generate_password_hash(
            request.form.get('password'),
            method='pbkdf2:sha256',
            salt_length=8
        )
        new_user = User(
            name = request.form.get("name"),
            username = request.form.get("username"),
            password = hashpass,
            bits = 0,
            ethers = 0,
            doges = 0,
        )
        db.session.add(new_user)
        db.session.commit()
        login_user(new_user)
        return redirect(url_for('home'))
    return render_template("signup.html", logged_in=current_user.is_authenticated)


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('home'))

@app.route("/portfolio", methods=["GET", "POST"])
@login_required
def portfolio():
    if request.method == "POST":
        current_user.bits = request.form["bits"]
        current_user.ethers = request.form["ethers"]
        current_user.doges = request.form["doges"]
        db.session.commit()

    portfolio = current_user.bits * 60000
    portfolio += current_user.doges * .30
    portfolio += current_user.ethers * 2000
    portfolio = "{:,.2f}".format(portfolio)
    return render_template("portfolio.html", user=current_user, value=portfolio)
