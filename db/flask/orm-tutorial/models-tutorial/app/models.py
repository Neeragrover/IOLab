from app import db

customer_order = db.Table('customer_order',
    db.Column('cid', db.Integer, db.ForeignKey('customer.cust_id')),
    db.Column('oid', db.Integer, db.ForeignKey('order.order_id'))

   )

class Customer(db.Model):
    cust_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(120))
    last_name = db.Column(db.String(120))
    company = db.Column(db.String(120), unique=False)
    email = db.Column(db.String(120))
    phone = db.Column(db.String(20))
    addresses = db.relationship('Address', backref='customer',lazy='dynamic')
    # You need to a relationship to Address table here
    # see http://flask-sqlalchemy.pocoo.org/2.1/models/#one-to-many-relationships
    orders = db.relationship('Order', secondary=customer_order,
        backref=db.backref('customer', lazy='dynamic'))


    def __repr__(self):
        return '<Customer %r>' % self.email

#Your Address code should go here
class Address(db.Model):
    add_id = db.Column(db.Integer, primary_key=True)
    street_address = db.Column(db.String(120))
    city = db.Column(db.String(100))
    state = db.Column(db.String(50))
    country = db.Column(db.String(120))
    zip_code = db.Column(db.Integer)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.cust_id'))


class Order(db.Model):
    order_id = db.Column(db.Integer, primary_key=True)
    total_spent = db.Column(db.Integer)
    parts_ordered = db.Column(db.Integer)


    