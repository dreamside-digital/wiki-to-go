require 'rails_helper'

RSpec.describe Api::BooksController, :type => :controller do

  context "user with saved books is logged in" do 

    let(:user) { FactoryGirl.create(:user) }
    
    before do
      user.books << FactoryGirl.create(:book)
    end

    # describe 'GET #index' do
    #   it 'should return an array of user\'s books' do
    #     get :index, { user_id: user.id }, format: :json
    #     expect(JSON.parse(response.body)["books"]).to be_present
    #   end
    # end

    # describe 'GET #show' do
    #   it 'should return book info, array of articles, and array of markers' do
    #     book = user.books.last
    #     get :show, { user_id: user.id, id: book.id }, format: :json
    #     expect(JSON.parse(response.body)["book"]).to be_present
    #     expect(JSON.parse(response.body)["articles"]).to be_present
    #     expect(JSON.parse(response.body)["markers"]).to be_present
    #   end
    # end

    describe 'POST #create' do
      it 'given valid data, should create book and associated articles and return book info' do
        book_attrs = FactoryGirl.attributes_for(:book)
        book_attrs[:articles] = []
        3.times { book_attrs[:articles] << FactoryGirl.attributes_for(:article, :from_json)}
        post :create, { user_id: user.id, book: book_attrs }, format: :json
        expect(JSON.parse(response.body)["book"]["id"]).to be_present
        expect(Book.last.title).to eq(book_attrs[:title])
      end
    end

    describe 'PATCH #update' do
      it 'should update book and return book data' do
        new_book_attrs = FactoryGirl.attributes_for(:book)
        new_book_attrs[:articles] = []
        3.times { new_book_attrs[:articles] << FactoryGirl.attributes_for(:article, :from_json)}
        book = FactoryGirl.create(:book, user_id: user.id)
        patch :update, { user_id: user.id, id: book.id, book: new_book_attrs}, format: :json
        expect(JSON.parse(response.body)["book"]["id"]).to eq(book.id)
        expect(Book.find(book.id).title).to eq(new_book_attrs[:title])
      end
    end

    describe 'DELETE #destroy' do
      it 'should destroy book and return deleted book id' do
        book = Book.last
        delete :destroy, { user_id: user.id, id: book.id }, format: :json
        expect(JSON.parse(response.body)["book"]["id"]).to eq(book.id)
        expect(Book.find_by(id: book.id)).to be_nil
      end
    end

  end

end