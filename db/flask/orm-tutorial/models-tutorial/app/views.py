from flask import render_template, redirect, request
from app import app, models, db
from .forms import CustomerForm


@app.route('/')
def index():
    return redirect('/create_customer')

@app.route('/create_customer', methods=['GET', 'POST'])
def create_customer():
    print "cust"
    form = CustomerForm()
    if form.validate_on_submit():
        customer = models.Customer(
                            company = form.company.data,
                            email = form.email.data,
                            first_name = form.first_name.data,
                            last_name = form.last_name.data,
                            phone = form.phone.data)
        address = models.Address(
                            customer = customer,
                            street_address = form.street_address.data,
                            city = form.city.data,
                            state = form.state.data,
                            zip_code = form.zip_code.data,
                            country = form.country.data)
        order = models.Order(
                            customer = [customer],
                            parts_ordered = form.parts_ordered.data,
                            total_spent = form.total_spent.data)
        # you will need to add Address here
        db.session.add(customer)
        db.session.add(address)
        db.session.add(order)
        db.session.commit()
        return redirect('/customers')
    return render_template('customer.html', form=form)

@app.route('/customers')
def display_customer():
    all_customers = models.Customer.query.all()
    all_addresses = models.Address.query.all()
    all_orders = models.Order.query.all()
    return render_template('home.html',
                            customers=all_customers,
                            addresses = all_addresses,
                            orders = all_orders)
